require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const fs = require('fs');
const path = require('path');
const connectDB = require('../../src/config/db');
const Medicine = require('../models/Medicine');

const loadJson = (relPath) => {
  const p = path.join(__dirname, '../../', relPath);
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
};

const run = async () => {
  try {
    await connectDB();

    console.log('Clearing existing medicines...');
    await Medicine.deleteMany({});

    const prescription = loadJson('data/prescription.json');
    const nonPrescription = loadJson('data/nonPrescription.json');
    const general = loadJson('data/generalProducts.json');

    const docs = [];

    prescription.forEach((p) => {
      docs.push({
        name: p.name,
        price: p.price,
        description: p.description || '',
        image: p.img || p.image || '',
        prescriptionRequired: true,
        category: 'prescription',
        stock: p.stock || Math.floor(Math.random() * 90) + 10,
      });
    });

    nonPrescription.forEach((p) => {
      docs.push({
        name: p.name,
        price: p.price,
        description: p.description || '',
        image: p.img || p.image || '',
        prescriptionRequired: false,
        category: 'non-prescription',
        stock: p.stock || Math.floor(Math.random() * 90) + 10,
      });
    });

    general.forEach((p) => {
      docs.push({
        name: p.name,
        price: p.price,
        description: p.description || '',
        image: p.img || p.image || '',
        prescriptionRequired: false,
        category: 'general',
        stock: p.stock || Math.floor(Math.random() * 90) + 10,
      });
    });

    console.log(`Inserting ${docs.length} products...`);
    await Medicine.insertMany(docs);
    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
