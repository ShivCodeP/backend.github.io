const transporter = require("../configs/mail")

module.exports = (from,to,subject,text,html,attachment=null) => {
    
    const message = {
        from,
        to,
        subject,
        text,
        html,
        attachment
    };
    
    transporter.sendMail(message);

}