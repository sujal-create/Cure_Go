"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
export default function CartPage(){
  const [items, setItems] = useState<any[]>([]);
  const [isReadyForPayment, setIsReadyForPayment] = useState(false);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const addrRaw = localStorage.getItem('curego_address');
    const hasAddress = !!addrRaw;
    const missingPrescription = items.some((i:any) => i.prescriptionRequired && !i.prescriptionImage);
    setIsReadyForPayment(hasAddress && !missingPrescription && items.length>0);
  }, [items]);

  const getCartKey = () => {
    try { const user = JSON.parse(localStorage.getItem('curego_user')||'null'); return user && user.id ? `curego_cart_${user.id}` : 'curego_cart_guest'; } catch { return 'curego_cart_guest'; }
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(getCartKey());
      const cart = raw ? JSON.parse(raw) : [];
      setItems(cart);
    } catch (err) {
      setItems([]);
    }
  };

  const save = (next: any[]) => {
    localStorage.setItem(getCartKey(), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('curego_cart_updated', { detail: { count: next.reduce((s: any, i: any) => s + (i.quantity || 0), 0) } }));
    setItems(next);
  };

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

  const uploadPrescription = async (id: string, file: File) => {
    try {
      const data = await readFileAsDataUrl(file);
      const next = items.map(i => i.id === id ? { ...i, prescriptionImage: data } : i);
      save(next);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const removePrescription = (id: string) => {
    const next = items.map(i => i.id === id ? ({ ...i, prescriptionImage: undefined }) : i);
    save(next);
  };

  const changeQty = (id: string, delta: number) => {
    const next = items.map(i => i.id === id ? { ...i, quantity: Math.max(1, (i.quantity||1) + delta) } : i);
    save(next);
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id);
    save(next);
  };

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-zinc-700">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 border rounded-md p-3 hover:shadow-sm transition-shadow">
                <div className="w-24 h-24 flex items-center justify-center bg-white rounded-md overflow-hidden border">
                  {it.prescriptionImage ? (
                    <img src={it.prescriptionImage} alt="prescription" className="w-full h-full object-cover" />
                  ) : (it.category === 'non-prescription') ? (
                    <img src={'/non-prescription.png'} alt={it.title} className="w-full h-full object-contain" />
                  ) : (it.category === 'general') ? (
                    <img src={'/genral_products.png'} alt={it.title} className="w-full h-full object-contain" />
                  ) : it.prescriptionRequired ? (
                    <img src={'/prescription.png'} alt={it.title} className="w-full h-full object-contain" />
                  ) : (
                    <img src={(function(src){ if(!src) return '/genral_products.png'; if(src.startsWith('http')||src.startsWith('/')||src.startsWith('data:')) return src; return '/' + src})(it.img)} alt={it.title} className="w-full h-full object-contain" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-lg">{it.title} {it.prescriptionRequired && <span className="ml-2 inline-block text-xs px-2 py-1 bg-red-50 text-red-600 rounded">Rx</span>}</div>
                  <div className="text-sm text-zinc-600">₹{it.price} x {it.quantity}</div>

                  {it.prescriptionRequired && (
                    <div className="mt-2 flex items-center gap-3">
                      {!it.prescriptionImage ? (
                        <>
                          <label className="cursor-pointer rounded-md px-3 py-1 text-sm text-white" style={{ background: 'var(--primary)' }}>
                            <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) uploadPrescription(it.id, e.target.files[0]); }} className="hidden" />
                            Upload prescription
                          </label>
                          <div className="text-sm text-zinc-600">Prescription required for this medicine</div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <img src={it.prescriptionImage} alt="uploaded" className="w-16 h-16 object-cover rounded-md border" />
                          <div className="flex flex-col">
                            <div className="text-sm text-green-600">Prescription uploaded</div>
                            <button onClick={() => removePrescription(it.id)} className="text-sm text-red-600">Remove</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2 items-center">
                    <button onClick={() => changeQty(it.id, -1)} className="px-3 py-1 border rounded-md">-</button>
                    <div className="px-4 py-1 border rounded-md">{it.quantity}</div>
                    <button onClick={() => changeQty(it.id, 1)} className="px-3 py-1 border rounded-md">+</button>
                  </div>
                  <button onClick={() => remove(it.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}

            <div className="text-right font-semibold">Total: ₹{total}</div>
          </div>

          <aside className="border rounded-md p-4 shadow-sm sticky top-24">
            <h2 className="font-semibold mb-3">Delivery Address</h2>
            <div className="mb-4"><AddressCard /></div>

            <div className="mt-6">
              <div className="text-sm text-zinc-600 mb-2">Order Summary</div>
              <div className="flex justify-between"><div>Items</div><div>{items.reduce((s, i) => s + (i.quantity || 0), 0)}</div></div>
              <div className="mt-2 flex justify-between font-semibold"><div>Subtotal</div><div>₹{total}</div></div>
           
              <button onClick={() => proceedToPayment()} disabled={!isReadyForPayment} className="mt-4 w-full rounded-md px-4 py-2 text-white disabled:opacity-60" style={{ background: 'var(--primary)' }}>{isReadyForPayment ? 'Proceed to Payment' : 'Complete address & prescriptions'}</button>
            </div>
          </aside>
        </div>
      )}
    </div>
    </>
  )
}

function AddressCard(){
  const getAddressKey = () => { try { const user = JSON.parse(localStorage.getItem('curego_user')||'null'); return user && user.id ? `curego_address_${user.id}` : 'curego_address_guest'; } catch { return 'curego_address_guest'; } };
  const key = getAddressKey();
  const [address, setAddress] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : { name:'', phone:'', line1:'', city:'', state:'', pincode:'' }; } catch { return { name:'', phone:'', line1:'', city:'', state:'', pincode:'' }; }
  });
  const [editing, setEditing] = useState(() => {
    try { const raw = localStorage.getItem(key); const a = raw ? JSON.parse(raw) : null; return !(a && (a.name || a.line1)); } catch { return true; }
  });
  const [errors, setErrors] = useState<any>({});
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  useEffect(() => {
    // noop
  }, []);

  const save = () => {
    const e:any = {};
    if (!address.name) e.name = 'Required';
    if (!/^[6-9]\d{9}$/.test(address.phone||'')) e.phone = 'Invalid mobile';
    if (!address.line1) e.line1 = 'Required';
    if (!address.city) e.city = 'Required';
    if (!address.state) e.state = 'Required';
    if (!/^\d{5,6}$/.test(address.pincode||'')) e.pincode = 'Invalid pincode';
    setErrors(e);
    if (Object.keys(e).length) return false;
    try{ localStorage.setItem(getAddressKey(), JSON.stringify(address)); setEditing(false); return true; } catch { return false; }
  };

  const edit = () => setEditing(true);

  const useMyLocation = () => {
    setLocError(null);
    if (!navigator.geolocation) { setLocError('Geolocation not supported'); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude; const lng = pos.coords.longitude;
      const apiKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) || '';
      if (!apiKey) {
        // no API key — store coords as line1 so user can save
        setAddress((a:any)=>({ ...a, line1: `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}` }));
        setLocLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
        const json = await res.json();
        if (json.status === 'OK' && json.results && json.results.length) {
          const r = json.results[0];
          const formatted = r.formatted_address;
          // try extract components
          const comps:any = {};
          (r.address_components||[]).forEach((c:any)=>{ (c.types||[]).forEach((t:string)=>{ comps[t]=c.long_name; }) });
          setAddress((a:any)=>({ ...a, line1: formatted || a.line1, city: comps.locality || comps.postal_town || a.city, state: comps.administrative_area_level_1 || a.state, pincode: comps.postal_code || a.pincode }));
        } else {
          setLocError('Reverse geocode failed');
        }
      } catch (err:any) {
        console.error(err);
        setLocError('Location lookup failed');
      } finally {
        setLocLoading(false);
      }
    }, (err)=>{ setLocLoading(false); setLocError(err.message || 'Geolocation error'); }, { enableHighAccuracy: true, timeout: 10000 });
  };

  return (
    <div>
      {!editing ? (
        <div>
          <div className="text-sm">{address.name} — {address.phone}</div>
          <div className="text-sm text-zinc-600">{address.line1}, {address.city}, {address.state} - {address.pincode}</div>
          <button onClick={edit} className="mt-2 text-sm" style={{ color: 'var(--primary)' }}>Edit</button>
        </div>
      ) : (
        <div className="space-y-2">
          <input value={address.name} onChange={(e) => setAddress((a:any)=>({...a, name: e.target.value}))} placeholder="Full name" className="w-full border px-2 py-1 rounded" />
          {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
          <input value={address.phone} onChange={(e) => setAddress((a:any)=>({...a, phone: e.target.value}))} placeholder="Mobile (10 digits)" className="w-full border px-2 py-1 rounded" />
          {errors.phone && <div className="text-xs text-red-600">{errors.phone}</div>}
          <input value={address.line1} onChange={(e) => setAddress((a:any)=>({...a, line1: e.target.value}))} placeholder="Address line" className="w-full border px-2 py-1 rounded" />
          {errors.line1 && <div className="text-xs text-red-600">{errors.line1}</div>}
          <div className="flex gap-2">
            <input value={address.city} onChange={(e) => setAddress((a:any)=>({...a, city: e.target.value}))} placeholder="City" className="flex-1 border px-2 py-1 rounded" />
            <input value={address.state} onChange={(e) => setAddress((a:any)=>({...a, state: e.target.value}))} placeholder="State" className="w-20 border px-2 py-1 rounded" />
          </div>
          {(errors.city || errors.state) && <div className="text-xs text-red-600">{errors.city||errors.state}</div>}
          <input value={address.pincode} onChange={(e) => setAddress((a:any)=>({...a, pincode: e.target.value}))} placeholder="Pincode" className="w-32 border px-2 py-1 rounded" />
          {errors.pincode && <div className="text-xs text-red-600">{errors.pincode}</div>}
          <div className="flex gap-2">
            <button onClick={() => { if(save()) { /* saved */ } }} className="rounded-md px-3 py-1 text-white" style={{ background: 'var(--primary)' }}>Save Address</button>
            <button onClick={() => { setAddress({ name:'', phone:'', line1:'', city:'', state:'', pincode:'' }); setErrors({}); }} className="rounded-md px-3 py-1 border">Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}

async function proceedToPayment() {
  try {
    const user = JSON.parse(
      localStorage.getItem("curego_user") || "null"
    );

    const cartKey = user?.id
      ? `curego_cart_${user.id}`
      : "curego_cart_guest";

    const addressKey = user?.id
      ? `curego_address_${user.id}`
      : "curego_address_guest";

    const cartRaw = localStorage.getItem(cartKey);
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    const addrRaw = localStorage.getItem(addressKey);

    if (!addrRaw) {
      alert("Please add delivery address");
      return;
    }

    const missingPrescription = cart.some(
      (item: any) =>
        item.prescriptionRequired &&
        !item.prescriptionImage
    );

    if (missingPrescription) {
      alert(
        "Please upload prescription before payment."
      );
      return;
    }

    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      }
    );

    const order = await res.json();
console.log("KEY:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
console.log("ORDER:", order);
console.log("Razorpay:", window.Razorpay);
    const options = {

      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: "INR",

      name: "CureGo",

      description: "Medicine Order",

      order_id: order.id,

   handler: async function (response : any) {

  // SAVE TO MONGODB
  await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user?.id,
      customerName: user?.name,
      email: user?.email,
      razorpayPaymentId:
        response.razorpay_payment_id,
      razorpayOrderId:
        response.razorpay_order_id,
      items: cart,
      totalAmount: total,
      address: JSON.parse(addrRaw),
      paymentStatus: "Paid",
      orderStatus: "Pending",
    }),
  }
);

  // EXISTING LOCALSTORAGE CODE
  const existingOrders =
    JSON.parse(
      localStorage.getItem(
        "curego_orders"
      ) || "[]"
    );

  existingOrders.push({
    paymentId:
      response.razorpay_payment_id,

    orderId:
      response.razorpay_order_id,

    items: cart,

    amount: total,

    address: JSON.parse(addrRaw),

    status: "Paid",

    createdAt:
      new Date().toISOString(),
  });

  localStorage.setItem(
    "curego_orders",
    JSON.stringify(existingOrders)
  );

  localStorage.removeItem(cartKey);

  window.dispatchEvent(
    new CustomEvent(
      "curego_cart_updated",
      {
        detail: { count: 0 },
      }
    )
  );

       alert("Payment Successful!");

      window.location.href = "/orders";
    },

    prefill: {
      name: user?.name || "",
      email: user?.email || "",
    },

    theme: {
      color: "#2563eb",
    },
  };

  const razorpay = new (window as any).Razorpay(options);

  razorpay.open();

} catch (error) {

  console.error("Payment Error:", error);

  alert("Payment failed");

}
}