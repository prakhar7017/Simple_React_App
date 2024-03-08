import nodemailer from 'nodemailer';


const mailSender=async(email,title,body)=>{
    try {

        let transpoter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
            secure:true
        })

        let info=await transpoter.sendMail({
            from:"Technopedia",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        return info;
        
    } catch (error) {
        console.log(error);
    }
}

export default mailSender;