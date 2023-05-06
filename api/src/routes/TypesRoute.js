const { Router } = require('express');
const router = Router();
const {Type} = require('../db');
const {getTypes}=require('./controllers')

router.get('/', async (req,res)=>{
   try {
      const typesFromDB = await Type.findAll();
      console.log(typesFromDB)
   
      if (typesFromDB.length > 0) {
        const types = typesFromDB.map((type) => type.name);
        res.status(200).send(types);
      }else {
        const typesFromAPI = await getTypes();
        const types = await Promise.all(typesFromAPI.map(async (typeName) => {
          const type = await Type.create({ name: typeName });
          return type.name;
        }));
        res.status(200).send(types);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
})





module.exports=router;