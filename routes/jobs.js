const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

//Detalhe da vaga -> view/1, view/2
router.get('/view/:id', (req, res) => Job.findOne({
        where: {id: req.params.id}
    }).then(job => {

        res.render('viewJob', {
            job
        });

    }).catch(err => console.log(err))
);

//Renderizando tela da rota de cadastro de vaga
router.get('/add', (req, res) => {
    res.render('add');
});

// Adicionando job via metódo post na rota /add
router.post('/add', (req, res) => {

    let { title, description, salary, company, email, new_job } = req.body;

    // INSERT
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/')) // Redirecionando para a Home após o Insert
    .catch(err => {
        console.log(err);
    });
    
});

module.exports = router;