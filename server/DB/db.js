const Sequelize = require('sequelize');

const seq = new Sequelize('sqlite:../SQL3/spot.db', { logging: false });
// const seq = new Sequelize(
//     'sqlite:/Users/creep/Something/TryNodeJS/网页课/sSQL3/spot.db'
// );

seq.authenticate().then(() => {
    console.log('+++ SQL connection created +++');
});

exports.client = seq;
