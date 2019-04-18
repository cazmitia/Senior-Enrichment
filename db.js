const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/senior-enrichmentdb')
const faker = require('faker')

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        },
        defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyr857BC53dBvGPK3iOLzwSAvfpSqb6n_GzvFhKI0-iSApEqZ_'
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
    }

})

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        },
        defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyr857BC53dBvGPK3iOLzwSAvfpSqb6n_GzvFhKI0-iSApEqZ_'
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

Student.belongsTo(Campus)
Campus.hasMany(Student)
 
const initDb = (force = false) => {
    return db.sync({force})
    .then(() => {
        return Promise.all([
            Campus.create({name: 'School A', address: '123 Fake Street, New York, NY 10001', description: 'This school is awesome!'}),
            Campus.create({name: 'School B', address: '456 Fake Street, New York, NY 10001', description: 'This school is ok.'}),
            Campus.create({
                name: faker.address.city(),
                imageUrl: faker.image.image(),
                address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()},`, 
                description: faker.company.bs()}),
            Campus.create({name: 'School C', address: '789 Fake Street, New York, NY 10001', description: 'This school sucks!'})
        ])
    })
    .then(([CampusA, CampusB, CampusC, CampusD]) => {
        const studArr = () => {
            const arr = []
            let count = 0
            while (count < 40) {
                if (count < 10) {
                    arr.push({firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), gpa: Math.round(Math.random() * 400) / 100, imageUrl: faker.image.avatar(), campusId: CampusA.id})
                } else if (count < 20) {
                    arr.push({firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), gpa: Math.round(Math.random() * 400) / 100, imageUrl: faker.image.avatar(), campusId: CampusB.id})
                } else if (count < 30) {
                    arr.push({firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), gpa: Math.round(Math.random() * 400) / 100, imageUrl: faker.image.avatar(), campusId: CampusC.id})
                } else {
                    arr.push({firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), gpa: Math.round(Math.random() * 400) / 100, imageUrl: faker.image.avatar(), campusId: CampusD.id})
                }
                ++count;
            }
            return arr;
        }
        Promise.all(studArr().map(stud => Student.create(stud)))
        .catch(e => console.log(e))
    })
}



module.exports = {
    Campus,
    Student,
    initDb
}

