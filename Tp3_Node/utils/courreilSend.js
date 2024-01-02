const nodemailer = require('nodemailer');
const envoieCouriel = async (courriel) => {
    try {

        // le transporteur pour envoie les courriel 
        const transporteur = nodemailer.createTransport({
            // host d'abord c'est quel type de qu'on veut envoie 
            // si c'est email  host: "smtp.ethereal.email",
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                // compte principale de qui envoie 
                user: "papou_tp3@hotmail.com",
                pass: "sanaba_traore"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        // les information d'envoie 
        code = Math.floor(Math.random() * 900000) + 100000;
        const info = await transporteur.sendMail({
            from: '"SKC" <papou_tp3@hotmail.com>', // sender address
            //abdramanekassambara@teccart.online
            to: `${courriel}`, // list of receivers
            subject: " Confirmation de code  ", // Subject line
            html: `<b style="color:green">Votre Code de Confirmation est : ${confirmationCode}</b>`, // html body
        });
        console.log(`Message bien evoyer voici l'id du Message :${info.messageId}`);
    } catch (error) {
        console.log(`Erreur d'envoie : ${error}`);
    }
  
};

