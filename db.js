const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/senior-enrichmentdb')

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
        defaultValue: 'https://makitweb.com/demo/broken_image/images/noimage.png'
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
        }
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
            Campus.create({name: 'School A', address: '123 Fake Street, New York, NY 10001'}), 
            Campus.create({name: 'School B', address: '456 Fake Street, New York, NY 10001'}), 
            Campus.create({name: 'School C', address: '789 Fake Street, New York, NY 10001'})
        ])
    })
    .then(([CampusA, CampusB, CampusC]) => {
        Promise.all(
            Student.create({firstName: 'Charles', lastName: 'Azmitia', email: 'Charles@email.com', gpa: '4.0', campusId: CampusA.id})
        )
        .catch(e => console.log(e))
    })
}

module.exports = {
    Campus,
    Student,
    initDb
}
