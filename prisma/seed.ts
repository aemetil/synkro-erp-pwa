// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seed...");

  // Supprimer les données existantes
  await db.appointment.deleteMany();
  await db.consultation.deleteMany();
  await db.patient.deleteMany();
  await db.stockMovement.deleteMany();
  await db.saleItem.deleteMany();
  await db.sale.deleteMany();
  await db.product.deleteMany();
  await db.productCategory.deleteMany();
  await db.expense.deleteMany();
  await db.session.deleteMany();
  await db.account.deleteMany();
  await db.user.deleteMany();
  await db.entreprise.deleteMany();

  console.log("✅ Données existantes supprimées");

  // Créer une entreprise de démonstration
  const entreprise = await db.entreprise.create({
    data: {
      name: "Entreprise Démo",
      slug: "demo",
      sector: "COMMERCE",
      email: "contact@demo.ht",
      phone: "+509 3456 7890",
      address: "15 Rue Capois",
      city: "Croix-des-Missions",
      postalCode: "HT6110",
      country: "HT",
      currency: "HTG",
      secondaryCurrency: "USD",
      timezone: "America/Port-au-Prince",
      subscriptionTier: "PROFESSIONAL",
      subscriptionStatus: "ACTIVE",
      aiEnabled: true,
      advancedReports: true,
      multiUser: true,
      maxUsers: 20,
    },
  });

  console.log("✅ Entreprise créée:", entreprise.name);

  // Créer un utilisateur admin
  const passwordHash = await hash("demo123", 12);

  const adminUser = await db.user.create({
    data: {
      email: "admin@demo.com",
      name: "Sylvain ODNIS",
      passwordHash,
      role: "ADMIN",
      isActive: true,
      entrepriseId: entreprise.id,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Utilisateur admin créé:", adminUser.email);

  // Créer des ventes de démo
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const sales = [];
  for (let i = 1; i <= 10; i++) {
    const saleDate = new Date(thisMonth);
    saleDate.setDate(i * 2);

    const subtotal = Math.random() * 500 + 100;
    const taxAmount = subtotal * 0.2;
    const total = subtotal + taxAmount;

    const sale = await db.sale.create({
      data: {
        saleNumber: `SALE-2025-${String(i).padStart(4, "0")}`,
        customerName: `Client ${i}`,
        subtotal,
        taxAmount,
        discount: 0,
        total,
        paymentMethod: i % 2 === 0 ? "CARD" : "CASH",
        paymentStatus: i % 3 === 0 ? "PENDING" : "PAID",
        paidAmount: i % 3 === 0 ? 0 : total,
        date: saleDate,
        paidDate: i % 3 === 0 ? null : saleDate,
        entrepriseId: entreprise.id,
        items: {
          create: [
            {
              name: `Produit ${i}`,
              description: `Description du produit ${i}`,
              quantity: Math.floor(Math.random() * 5) + 1,
              unitPrice: subtotal / (Math.floor(Math.random() * 5) + 1),
              taxRate: 20,
              total: subtotal,
            },
          ],
        },
      },
    });
    sales.push(sale);
  }

  console.log(`✅ ${sales.length} ventes créées`);

  // Créer des dépenses de démo
  const expenseCategories = [
    "LOUER",
    "SALAIRES",
    "FOURNITURES",
    "ELECTRICITE",
    "INTERNET",
    "MARKETING",
    "AUTRES: CHARGES",
  ];

  const expenses = [];
  for (let i = 1; i <= 8; i++) {
    const expenseDate = new Date(thisMonth);
    expenseDate.setDate(i * 3);

    const expense = await db.expense.create({
      data: {
        description: `Dépense ${expenseCategories[i % expenseCategories.length]}`,
        amount: Math.random() * 300 + 50,
        category: expenseCategories[i % expenseCategories.length],
        paymentMethod: "BANK_TRANSFER",
        date: expenseDate,
        supplierName: `Fournisseur ${i}`,
        notes: `Note pour la dépense ${i}`,
        entrepriseId: entreprise.id,
      },
    });
    expenses.push(expense);
  }

  console.log(`✅ ${expenses.length} dépenses créées`);

  // Créer des catégories de produits
  const categories = await Promise.all([
    db.productCategory.create({
      data: {
        name: "Boissons",
        description: "Boissons fraîches et gazeuses",
        color: "#3B82F6",
        entrepriseId: entreprise.id,
      },
    }),
    db.productCategory.create({
      data: {
        name: "Alimentation",
        description: "Produits alimentaires",
        color: "#10B981",
        entrepriseId: entreprise.id,
      },
    }),
    db.productCategory.create({
      data: {
        name: "Hygiène",
        description: "Produits d'hygiène",
        color: "#F59E0B",
        entrepriseId: entreprise.id,
      },
    }),
  ]);

  console.log(`✅ ${categories.length} catégories de produits créées`);

  // Créer des produits
  const products = await Promise.all([
    db.product.create({
      data: {
        productCode: "PROD-2025-0001",
        name: "Coca-Cola 350ml",
        description: "Boisson gazeuse",
        categoryId: categories[0].id,
        costPrice: 25,
        sellingPrice: 50,
        taxRate: 10,
        currentStock: 100,
        minStockLevel: 20,
        unit: "pcs",
        sku: "COC350",
        barcode: "5449000000996",
        isActive: true,
        entrepriseId: entreprise.id,
      },
    }),
    db.product.create({
      data: {
        productCode: "PROD-2025-0002",
        name: "Pain de mie",
        description: "Pain tranché",
        categoryId: categories[1].id,
        costPrice: 40,
        sellingPrice: 75,
        taxRate: 0,
        currentStock: 50,
        minStockLevel: 15,
        unit: "pcs",
        isActive: true,
        entrepriseId: entreprise.id,
      },
    }),
    db.product.create({
      data: {
        productCode: "PROD-2025-0003",
        name: "Savon Dove",
        description: "Savon de toilette",
        categoryId: categories[2].id,
        costPrice: 35,
        sellingPrice: 60,
        taxRate: 10,
        currentStock: 8,
        minStockLevel: 10,
        unit: "pcs",
        isActive: true,
        entrepriseId: entreprise.id,
      },
    }),
    db.product.create({
      data: {
        productCode: "PROD-2025-0004",
        name: "Eau minérale 1.5L",
        description: "Eau embouteillée",
        categoryId: categories[0].id,
        costPrice: 15,
        sellingPrice: 30,
        taxRate: 0,
        currentStock: 200,
        minStockLevel: 50,
        unit: "pcs",
        isActive: true,
        entrepriseId: entreprise.id,
      },
    }),
    db.product.create({
      data: {
        productCode: "PROD-2025-0005",
        name: "Riz 1kg",
        description: "Riz blanc",
        categoryId: categories[1].id,
        costPrice: 80,
        sellingPrice: 120,
        taxRate: 0,
        currentStock: 150,
        minStockLevel: 30,
        unit: "kg",
        isActive: true,
        entrepriseId: entreprise.id,
      },
    }),
  ]);

  console.log(`✅ ${products.length} produits créés`);

  // Créer des mouvements de stock initiaux
  for (const product of products) {
    await db.stockMovement.create({
      data: {
        productId: product.id,
        type: "IN",
        quantity: product.currentStock,
        previousStock: 0,
        newStock: product.currentStock,
        reason: "Stock initial",
        reference: "INIT-2025",
        entrepriseId: entreprise.id,
      },
    });
  }

  console.log("✅ Mouvements de stock initiaux créés");

  // Créer des patients
  const patients = await Promise.all([
    db.patient.create({
      data: {
        patientNumber: "PAT-2025-0001",
        firstName: "Jean",
        lastName: "Baptiste",
        dateOfBirth: new Date("1995-03-15"),
        gender: "MALE",
        phone: "+509 3712 3456",
        email: "jean.baptiste@gmail.com",
        address: "25 Rue des Miracles",
        city: "Saint-Marc",
        bloodType: "O+",
        allergies: "Pénicilline",
        chronicDiseases: "Hypertension",
        emergencyContact: "Marie Baptiste",
        emergencyPhone: "+509 3712 7890",
        insuranceProvider: "Assurance Nationale",
        insuranceNumber: "AN-123456",
        entrepriseId: entreprise.id,
      },
    }),
    db.patient.create({
      data: {
        patientNumber: "PAT-2025-0002",
        firstName: "Magrécile",
        lastName: "CHARLES",
        dateOfBirth: new Date("1950-07-22"),
        gender: "FEMALE",
        phone: "+509 3798 1234",
        address: "10 Avenue Christophe",
        city: "VERRETTES",
        bloodType: "A+",
        emergencyContact: "Melius EMETIL",
        emergencyPhone: "+509 3798 5678",
        entrepriseId: entreprise.id,
      },
    }),
    db.patient.create({
      data: {
        patientNumber: "PAT-2025-0003",
        firstName: "Sylvain",
        lastName: "Odnis",
        dateOfBirth: new Date("1978-11-05"),
        gender: "MALE",
        phone: "+509 3745 6789",
        address: "8 Rue Lamarre",
        city: "Croix-des-Missions",
        bloodType: "B+",
        allergies: "Aspirine",
        entrepriseId: entreprise.id,
      },
    }),
  ]);

  console.log(`✅ ${patients.length} patients créés`);

  // Créer des consultations
  const consultations = await Promise.all([
    db.consultation.create({
      data: {
        consultationNumber: "CONS-2025-0001",
        patientId: patients[0].id,
        date: new Date(today.getFullYear(), today.getMonth(), 5),
        chiefComplaint: "Maux de tête persistants",
        symptoms: "Céphalées, fatigue",
        diagnosis: "Migraine",
        treatment: "Paracétamol 500mg, 3x/jour",
        notes: "Patient stressé au travail",
        temperature: 37.2,
        bloodPressure: "140/90",
        heartRate: 75,
        weight: 78.5,
        height: 175,
        fee: 1500,
        isPaid: true,
        entrepriseId: entreprise.id,
      },
    }),
    db.consultation.create({
      data: {
        consultationNumber: "CONS-2025-0002",
        patientId: patients[1].id,
        date: new Date(today.getFullYear(), today.getMonth(), 10),
        chiefComplaint: "Toux et fièvre",
        symptoms: "Toux sèche, température élevée",
        diagnosis: "Infection respiratoire",
        treatment: "Amoxicilline 500mg, 2x/jour pendant 7 jours",
        temperature: 38.5,
        bloodPressure: "120/80",
        heartRate: 82,
        weight: 65,
        height: 162,
        fee: 2000,
        isPaid: false,
        entrepriseId: entreprise.id,
      },
    }),
    db.consultation.create({
      data: {
        consultationNumber: "CONS-2025-0003",
        patientId: patients[2].id,
        date: new Date(today.getFullYear(), today.getMonth(), 15),
        chiefComplaint: "Douleurs articulaires",
        symptoms: "Douleurs aux genoux",
        diagnosis: "Arthrite légère",
        treatment: "Anti-inflammatoires, repos",
        temperature: 36.8,
        bloodPressure: "130/85",
        heartRate: 70,
        weight: 82,
        height: 180,
        fee: 1800,
        isPaid: true,
        nextAppointment: new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          15,
        ),
        entrepriseId: entreprise.id,
      },
    }),
  ]);

  console.log(`✅ ${consultations.length} consultations créées`);

  // Créer des rendez-vous
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const appointments = await Promise.all([
    db.appointment.create({
      data: {
        patientId: patients[0].id,
        scheduledAt: new Date(tomorrow.setHours(9, 0, 0, 0)),
        duration: 30,
        type: "FOLLOW_UP",
        status: "CONFIRMED",
        reason: "Suivi migraine",
        notes: "Vérifier l'efficacité du traitement",
        entrepriseId: entreprise.id,
      },
    }),
    db.appointment.create({
      data: {
        patientId: patients[1].id,
        scheduledAt: new Date(tomorrow.setHours(14, 30, 0, 0)),
        duration: 30,
        type: "CONSULTATION",
        status: "SCHEDULED",
        reason: "Consultation générale",
        entrepriseId: entreprise.id,
      },
    }),
  ]);

  console.log(`✅ ${appointments.length} rendez-vous créés`);

  console.log("\n🎉 Seed terminé avec succès !");
  console.log("\n📝 Informations de connexion :");
  console.log("   Email: admin@demo.com");
  console.log("   Mot de passe: demo123");
  console.log("\n🚀 Démarrez l'application avec: npm run dev");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
