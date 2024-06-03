const { db } = require('./index.js');
const Student = require('./Student.js');

const insertSampleStudents = async () => {
  try {
    await Student.insertMany(sampleData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error seeding the database: ', error);
  } finally {
    db.close();
  }
};

insertSampleStudents();
