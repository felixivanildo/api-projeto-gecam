const pool = require("../DB/DBconnection")
const crypto = require('crypto')
const Obatain = require('../Query/Query')
const fs = require('fs')
const Layouts = require('../Layout/Extraction')
const puppeteer = require("puppeteer")


const getUser = (req, res) => {
    pool.query(`
    select  u.userid, concat (u.firstname, ' ', u.lastname) as "firstname", u.phone as "phone", s.sectoraka as "country", c.cityname as "city", u.jobttitle as "jobtitle", u.isactive, u.username from users u
    left join sector s on s.sectorid = u.sectorid
    left join building b on b.buildingid = u.buildingid
    left join city c on c.cityid = b.cityid`, (err, results) => {
        if (err) {
            throw err
        }
        // console.log(results.rows)
        res.status(200).json(results.rows)
    })
}


const getExclusive = (req, res) => {
    // console.log(req.body)
    pool.query(`select u.userid as "id",u.firstname as "firstName", u.lastname as "lastName", u.phone as "phone", s.sectoraka as "country",
     c.cityname as "city", u.jobttitle as "jobtitle", u.isactive, u.username as "email"
    from users u
    left join sector s on s.sectorid = u.sectorid
    left join building b on b.buildingid = u.buildingid
    left join city c on c.cityid = b.cityid
    where u.userid = ${req.body.id}`, (err, results) => {
        if (err) {
            throw err
        }

        // console.log('entrei')
        // console.log(results.rows)
        res.json(results.rows)
    })


}

const localize = (req, res) => {
    const imageArray = [];

    // console.log(req.body)



    // console.log(`SELECT filename, report_id, file_id, fileextension FROM report_file WHERE report_id = ${req.body.id}`)
    pool.query(`SELECT filename, report_id, file_id, fileextension FROM report_file WHERE report_id = ${req.body.id}`, (err, results) => {
        if (err) {
            // console.error('Error executing first query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        //   console.log(results.rows)

        for (let i = 0; i < results.rowCount; i++) {

            const imagepath = `./Images/${results.rows[i].filename}.${results.rows[i].fileextension}`;

            try {
                const imageBuffer = fs.readFileSync(imagepath);
                const base64img = imageBuffer.toString('base64');
                //   console.log(base64img)
                //   console.log(base64img.split('/')[0]);
                imageArray.push({ image: base64img, extension: results.rows[i].fileextension, imageid: results.rows[i].file_id, repoid: results.rows[i].report_id });
            } catch (error) {
                console.error(`Error reading file ${imagepath}: ${error.message}`);
            }
        }

        // Second query for exclusive report
        pool.query(Obatain.GetExclusiveReport(req.body.id), (err, results) => {
            if (err) {
                console.error('Error executing second query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json({ data: results.rows, files: imageArray });
        });
    });
};



const login = (req, res) => {
    const hashedpass = crypto.createHash('md5').update(req.body.pass).digest('hex')
    // console.log('entrei')

    pool.query(`select u.*, s.sectoraka as "country", c.cityname as "city" from users u inner join sector s on s.sectorid = u.sectorid
    inner join building b on b.buildingid = u.buildingid
    inner join city c on c.cityid = b.cityid
    where username = '${req.body.user}' and userpassword = '${hashedpass}' and u.isactive = true `, (err, results) => {
        if (err) {
            throw err
        }

        if (results.rowCount > 0) {
            res.json({ message: '616e6420617320697420626567696e732c206c696b6520746865206120666c617368206974206661646573206f7574', info: results.rows[0] })
        } else {
            // const error = new Error ("Usuario não encontrado")
            res.json({ message: 'not found' })
        }
    })
}

const registrar = (req, res) => {
    const hashedpass = crypto.createHash('md5').update(req.body.password).digest('hex')

    pool.query(`select * from users where username = '${req.body.email}'`, (err, results) => {
        if (results.rowCount > 0) {
            res.json('Email já esta sendo utilizado')
        } else {
            pool.query(`insert into users (firstname, lastname, userpassword, username, jobttitle) values ('${req.body.firstname}', '${req.body.lastname}', '${hashedpass}', '${req.body.email}', 'awaitingAsign')`, (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else { res.json('Usuario criado, aguarde liberação da SUPMAST') }


            })

        }
    })


}

const getreport = async (req, res) => {
    var objectsArray = [];

    try {
        pool.query(Obatain.GetAllReports(), (err, results) => {
            // console.log(results.rowCount);
            for (var i = 0; i <= results.rowCount - 1; i++) {
                var resultado = results.rows[i];

                var tratado = {
                    id: resultado.id,
                    address: {
                        city: resultado.cityname,
                        country: resultado.sectorname,
                        state: resultado.unityname,
                        street: '2849 Fulton Street'
                    },
                    avatar: '/assets/avatars/avatar-carson-darrin.png',
                    createdAt: resultado.createdAt,
                    email: resultado.username,
                    name: resultado.name,
                    phone: resultado.email
                };

                objectsArray.push(tratado);
            }

            res.send(objectsArray);
        });
    } catch (error) {
        console.log(error);
    }
};


const getBuilding = async (req, res) => {
    pool.query(`select buildingname as "title", buildingid as "id" from building`, (err, results) => {
        if (err) {
            res.json({ message: err })
        }

        res.json(results.rows)
    })
}

const getmyreports = async (req, res) => {
    var objectsArray = [];

    // console.log(Obatain.GetMyReports({ userrole: req.body.role, userid: req.body.id }))
    try {
        pool.query(Obatain.GetMyReports({ userrole: req.body.role, userid: req.body.id }), (err, results) => {

            //   console.log(results.rowCount);
            for (var i = 0; i <= results.rowCount - 1; i++) {
                var resultado = results.rows[i];
                // console.log(results.rows[i])

                var tratado = [{
                    id: resultado.report_id,
                    ref: resultado.reportname,
                    amount: 30.5,
                    customer: {
                        name: resultado.sectorname
                    },
                    createdAt: new Date(resultado.updatedat),
                    status: resultado.status_nmndscr
                }]

                objectsArray.push(tratado[0]);
            }

            //   console.log(objectsArray);
            res.send(objectsArray);
        });
    } catch (error) {
        console.log(error);
    }
}


const deleteImage = async (req, res) => {
    console.log(req.body)

    const files = req.body.id

    // console.log(`select * from report_file where file_id = ${files}`)
    // console.log(`delete from report_file where file_id = ${files}`)



    pool.query(`select * from report_file where file_id = ${files}`, (err, results) => {

        if (err) {
            res.json({ message: err })
        }

        imagepath = `./Images/${results.rows[0].filename}.${results.rows[0].fileextension}`

        fs.unlink(imagepath, (error) => {
            if (error) {
                res.json(error)
            } else {


                pool.query(`delete from report_file where file_id = ${files}`, (err, results) => {
                    if (err) {
                        res.json({ message: err })

                    }
                    res.json({ message: "deleted" })
                }

                )

            }


        })

    })


    // pool.query(`delete from report_file where file_id in (${files})`, (err, results)=>{
    //     if(err){
    //         res.json({message: err})
    //     }

    //     pool.query(`select * from report_file where file_id = ${files}`, (err, results)=>{
    //             if(err){
    //                 res.json({message: err})
    //             }

    //             imagepath = `./Images/${results.rows[0].filename}.${results.rows[0].fileextension}`

    //         fs.unlink(imagepath, (error)=>{
    //             if(error){
    //                 res.json(error)
    //             }

    //             res.json({message: "deleted"})
    //         })


    //     })
    // })



}

const imgConverter = async (req, res) => {


    const date = new Date()

    // console.log(req.body)
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    var base64img = req.body.image
    // console.log(base64img.split(",")[1])

    const filename = crypto.createHash('md5').update(req.body.image + ' ' + date).digest('hex')

    fs.writeFile(`./Images/${filename}.${req.body.extension}`, base64img.split(",")[1], { encoding: 'base64' }, function (err) {
        console.log('File created');
    });

    var imagepath = "../Images" + req.body.name + req.body.extension
    var condition = false



    pool.query(`insert into report_file (report_id, filename, fileextension) values ((select report_id from report where reportname = '${req.body.reponame}'), '${filename}', '${req.body.extension}')`)

    while (!condition) {
        if (fs.existsSync(imagepath)) {
            condition = true
            await delay(2000)
        }
        await delay(2000)
    }


    // imageBuffer = fs.readFileSync(imagepath)

    console.log(imageBuffer)

    res.status(200).json({ message: 'created' })



}


const postReport = (req, res) => {

    // console.log(req.body)

    pool.query(`select * from report where reportname = '${req.body.dados.reportname}'`, async (err, haveany) => {
        if (err) {
            res.json({ message: err })
        }

        if (haveany.rowCount > 0) {
            res.json({ message: "Nome indisponivel ou já utilizado" })
        } else {
            // console.log(req.body)
            // Fields to exclude.
            // console.log('results')
            // res.json({ created: 'Yes' })
            const data = req.body.dados
            const excludedFields = ['sector', 'notes', 'reportname', 'name'];

            // Assuming 'your_table' is the name of your PostgreSQL table
            // const tableName = 'report_measurings';

            // let report_header_columns = '';
            // let report_header_values = '';

            let fq_columns = '';
            let fq_values = '';

            let bc_columns = '';
            let bc_values = '';


            let clr_columns = '';
            let clr_values = '';
            // const queryParams = [];

            //    console.log(data)

            for (const key in data) {
                // console.log(data.key)
                if (data.hasOwnProperty(key) && !excludedFields.includes(key)) {
                    if (String(key).split('_')[0] === 'fq') {
                        fq_columns += `${key} ,`
                        fq_values += `'${req.body.dados[key]}' ,`
                    }
                    if (String(key).split('_')[0] === 'bc') {
                        bc_columns += `${key} ,`
                        bc_values += `'${req.body.dados[key]}' ,`
                    }
                    if (String(key).split('_')[0] === 'clr') {
                        clr_columns += `${key} ,`
                        clr_values += `'${req.body.dados[key]}' ,`
                    }
                    // else{
                    //     report_header_columns += `${key} ,`
                    //     report_header_values +=  `'${req.body.dados[key]}' ,`
                    // }

                }


            }

            // Remove trailing comma and space
            // console.log(fq_columns === `fq_ph ,`? true :false, fq_values === `'' ,`? true : false)




            fq_columns === `fq_ph ,` ? fq_columns = `fq_ph ,fq_cor_aparente ,fq_turbidez ,fq_condutancia_especifica ,fq_acidez ,fq_alcalinidade_oh ,fq_alcalinidade_co ,
            fq_alcalinidade_hco ,fq_dureza_total ,fq_dureza_carbonatos ,fq_dureza_ncarbonatos ,fq_calcio ,fq_magnesio ,fq_cloretos ,fq_silica ,fq_sulfato ,
            fq_amonia ,fq_nitrato ,fq_nitrito ,fq_indice_nitrato_nitrito ,fq_ferro_total ,fq_sodio ,fq_potassio ,fq_solidos_totais ,fq_cloro_residual_livre ,
            fq_coliformes_totais ,fq_escherichia_coli`: fq_columns = fq_columns.slice(0, -2);
            fq_values === `'' ,` ? fq_values = ` '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''  ` : fq_values = fq_values.slice(0, -2);

            clr_columns.length <= 1 ? clr_columns = `clr_procedencia, clr_observacao_do_ambiente, clr_entrada_no_laboratorio, clr_condicao_da_amostra, clr_inicio_analise,
            clr_termino_analise, clr_volume_filtrado, clr_resultado` : clr_columns = clr_columns.slice(0, -2);
            clr_values.length <= 1 ? clr_values = `'','' ,'' ,'' ,'' ,'' ,'' ,''  ` : clr_values = clr_values.slice(0, -2);

            bc_columns.length <= 1 ? bc_columns = 'bc_cor, bc_turbidez, bc_cloro_residual_livre,  bc_coliformes_totais, bc_escherichia_coli, bc_ph ' : bc_columns = bc_columns.slice(0, -2)
            bc_values.length <= 1 ? bc_values = `'','','','','','' ` : bc_values = bc_values.slice(0, -2)

            // report_header_columns = report_header_columns.slice(0, -2)
            // report_header_values = report_header_values.slice(0, -2)

            // const insertQuery = `INSERT INTO ${tableName} (reportid, ${columns}) VALUES ((select report_id from report where reportname = '${req.body.dados.reportname}' limit 1), ${values}) RETURNING *;`;

            // console.log(clr_values)

            const insertQuerys = [`INSERT INTO report_measurings (reportid, ${fq_columns}) VALUES ((select report_id from report where reportname = '${req.body.dados.reportname}' limit 1), ${fq_values}) RETURNING *;`,
            `INSERT INTO report_bacteriologica (reportid, ${bc_columns}) VALUES ((select report_id from report where reportname = '${req.body.dados.reportname}' limit 1), ${bc_values}) RETURNING *;`,
            `INSERT INTO report_clorofila (reportid, ${clr_columns}) VALUES ((select report_id from report where reportname = '${req.body.dados.reportname}' limit 1), ${clr_values}) RETURNING *;`

            ]


            const query1 = () => {
                return new Promise((resolve, reject) => {
                    pool.query(Obatain.PostMyReport({ sector: req.body.dados.sector, user: req.body.usuario.id, name: req.body.dados.reportname }), (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                });
            };

            const query2 = () => {
                // console.log('results')

                for (var x = 0; x < insertQuerys.length; x++) {

                    // console.log(insertQuerys[x])
                    pool.query(insertQuerys[x], (err, results) => {
                        if (err) {
                            // handle error
                        } else {
                            // handle success
                        }
                    });
                }
            };

            const query3 = () => { pool.query(`insert into report_note (report_id, note) values ((select report_id from report where reportname = '${req.body.dados.reportname}'), '${req.body.dados.notes}')`, (err, results) => { }) }



            try {
                // const xzist = (``)
                await query1(); // Wait for query1 to complete
                query2(); // Execute query2 after query1 completes
                query3()

                res.json({ message: "Criado" })
            } catch (error) {
                // Handle errors from query1
                console.error(error);
            }
        }
    })
};



const getSectors = (req, res) => {

    pool.query('select sectoraka from sector', (err, results) => {
        res.json(results.rows)
    })
}


const postunity = (req, res) => {



}

const getUnitys = (req, res) => {
    pool.query("select u.unityname as \"title\", u.unityid as \"id\" from unity u\n", (err, results) => {
        if (err) {
            res.json({ message: err })
        }

        res.json(results.rows)
    })
}


const postModules = (req, res) => {

    if (req.body.mode === "cidade") {
        pool.query(`select * from city where cityname = '${req.body.dados.nomeCidade.toUpperCase()}'`, (err, results) => {
            // console.log(req.body)

            if (err) {
                return res.json({ message: err })
            }

            if (results.rowCount > 0) {
                return res.json({ message: "Nome de cidade indisponivel ou já utilizado" })
            } else {

                pool.query(`insert into city (cityname, unityid, isactive) values ('${req.body.dados.nomeCidade.toUpperCase()}', ${req.body.dados.unidadeOrg.id}, ${req.body.dados.switchFieldName})`, (err, results) => {
                    if (err) {
                        return res.json({ message: err })
                    }

                    return res.json({ message: "Criada" })
                })
            }


        }
        )
    }



    if (req.body.mode === "unidade") {
        // console.log(req.body)
        const unityActiveStatus = req.body.dados.switchFieldName ? 1 : 2

        pool.query(`select * from unity where unityname = '${req.body.dados.nomeUnidadeOrg.toUpperCase()}'`, (err, results) => {
            if (err) {
                return res.json({ message: err })
            }

            if (results.rowCount > 0) {
                return res.json({ message: "Nome de unidade indisponivel ou já utilizado" })
            } else {
                pool.query("INSERT INTO public.unity\n" +
                    "(unityname, activestatus, updatedat)\n" +
                    `VALUES('${req.body.dados.nomeUnidadeOrg.toUpperCase()}', ${unityActiveStatus}, CURRENT_DATE)\n`, (err, results) => {
                        if (err) {
                            return res.json({ error: err })
                        }

                        return res.json({ message: "Criada" })
                    })
            }
        })

    }



    if (req.body.mode === "setor") {
        pool.query(`select * from sector where sectorname = '${String(req.body.dados.nomeSetor).toUpperCase()}'`, (error, results) => {
            if (error) {
                return res.json(error)
            }


            if (results.rowCount > 0) {
                return res.json({ message: "Nome indisponivel ou já utilizado" })

            } else {

                // console.log(req.body.dados)
                pool.query(Obatain.InsertSector(req.body.dados), (err, results) => {
                    if (err) {
                        return res.json({ message: err })
                    }

                    return res.json({ message: "Criada" })
                })


            }
        })


    }


    if (req.body.mode === "predio") {
        pool.query(`select * from building where buildingname = '${req.body.dados.nomePredio.toUpperCase()}'`, (error, results) => {
            if (error) {
                return res.json(error)
            }


            if (results.rowCount > 0) {
                return res.json({ message: "Nome indisponivel ou já utilizado" })

            } else {
                pool.query(Obatain.InsertBuilding(req.body.dados), (err, results) => {
                    if (err) {
                        return res.json({ message: err })
                    }

                    return res.json({ message: "Criada" })
                })
            }
        })



    }

    if (req.body.mode === "interecado") {


        pool.query(`select * from interested_enterprises where enter_name = '${req.body.dados.nomeEmpresa.toUpperCase()}'`, (error, results) => {
            if (error) {

                return res.json(error)
            }


            if (results.rowCount > 0) {

                return res.json({ message: "Nome indisponivel ou já utilizado" })

            } else {
                // console.log(req.body.dados)
                pool.query(Obatain.InsertEnterprise(req.body.dados), (err, results) => {

                    if (err) {
                        return res.json({ message: err })
                    }

                    return res.json({ message: "Criada" })
                })
            }
        })



    }


    if (req.body.mode === "coleta") {


        pool.query(`select * from collect_type where ct_name = '${req.body.dados.nomeColeta.toUpperCase()}'`, (error, results) => {
            if (error) {

                return res.json(error)
            }


            if (results.rowCount > 0) {

                return res.json({ message: "Nome indisponivel ou já utilizado" })

            } else {
                // console.log(req.body.dados)
                pool.query(Obatain.InsertCollectType(req.body.dados), (err, results) => {

                    if (err) {
                        return res.json({ message: err })
                    }

                    return res.json({ message: "Criada" })
                })
            }
        })



    }






}

const GetCity = (req, res) => {
    pool.query('select cityname as "title", cityid as "id" from city', (err, results) => {
        if (err) {
            res.json({ message: err })
        }


        res.json(results.rows)
    })

}




const updateUser = (req, res) => {

    // console.log(req.body)
    pool.query(Obatain.updateUser(req.body), (err, results) => {
        if (err) {
            // console.log(Obatain.updateUser(req.body))
            // console.log(err)
            res.json({ message: err })
        }
        else {
            // console.log('heyyy, aca!!!!')
            res.json({ message: "Usuário Atualizado" })
        }



    })
}


const print = (req, res) => {
    console.log(req.body)
    // console.log(Layouts.HtmlLayout())

    async function htmlToPdf(htmlContent, outputPath) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set content to the page
        await page.setContent(htmlContent);

        // Generate PDF
        await page.pdf({ path: outputPath, format: 'A4', printBackground: true });

        // Close the browser
        await browser.close();
    }


    const outputPath = 'output.pdf';

    htmlToPdf(Layouts.HtmlLayout(), outputPath)
        .then(() => console.log('PDF generated successfully'))
        .catch(error => console.error('Error generating PDF:', error));
}


const notification = (req, res) => {
    pool.query("select pn.note as \"content\",  concat('a ' ,cast (( current_date  - pn.createdat) as varchar), ' Dias') as \"time\" , cast(vizualized as varchar) as \"title\", 'empty' as \"avatar\" from push_notifications pn\n", (err, results) => {
        res.json(results.rows)
    })
}


const getInterested = (req, res) => {

    pool.query('select * from interested_enterprises', (err, results) => {
        if (err) {
            res.json({ message: err })
        }


        res.json(results.rows)
    })
}

const getColectType = (req, res) => {
    pool.query('select * from collect_type', (err, results) => {
        if (err) {
            res.json({ message: err })
        }


        res.json(results.rows)
    })
}



module.exports = {
    getUser, localize, login, registrar,
    getreport, getmyreports, imgConverter, getSectors,
    postReport, postunity, getUnitys, postModules, GetCity,
    getExclusive, updateUser, deleteImage, getBuilding,
    print, notification, getInterested, getColectType
}


