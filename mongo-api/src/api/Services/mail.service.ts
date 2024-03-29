const nodemailer = require('nodemailer');
import { Service } from "typedi";
import * as ejs from 'ejs';
import * as path from 'path'
@Service()
export class MailService {
    public async sendMail(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const amqp = require('amqplib');
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createConfirmChannel();
            await channel.assertQueue('send-mail');
            await channel.consume('send-mail', async (message) => {
                const mailDatas = JSON.parse(message.content.toString());
                console.log(JSON.parse(message.content.toString()), 'JSON.parse(message.content.toString())JSON.parse(message.content.toString())')
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'arun.ang.js@gmail.com',
                        pass: 'dcfskcevcfmjaiqq'
                    }
                });
    
                let mailDetails = {
                    from: 'noreply@gmail.com',
                    to: mailDatas.mailId,
                    subject: 'Accept for Love',
                    html: ''
                };
    
    
                const directoryPath = path.join(process.cwd(), 'views', 'arundhika.ejs');
                const fs = require('fs');
    
                // Load the EJS template
                // const emailTemplate = fs.readFileSync(directoryPath, 'utf-8');
                const data = {
                    name: 'JOTHIKA A',
                    jobPosition: 'LAB MANAGER',
                    email: 'muthulakshmi0806@gmail.com',
                    phoneNumber: '8667384086',
                    address: '455, Anna nagar, chennai-876 598',
                    objective: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel semper lectus. Sed et lectus eget eros convallis congue. Vivamus pellentesque lacus ut nisi tincidunt, id sagittis mauris volutpat. Aenean elementum nec quam in volutpat. Nulla facilisi. Sed posuere ipsum eu turpis viverra, eu pulvinar elit blandit. Integer consectetur sapien nec sapien malesuada, nec euismod lectus fringilla. Nunc sed lectus quis quam blandit fermentum at et velit',
                    socialMedia: [
                        {
                            title: 'Facebook',
                            link: 'kuttyarun1088'
                        },
                        {
                            title: 'Linked In',
                            link: 'arun_15_05'
                        },
                        {
                            title: 'Git Hub',
                            link: 'github.com/arun0803200'
                        }
                    ],
                    experience: [
                        {
                            companyName: 'piccosoft',
                            city: 'Thiruvannamalai',
                            duration: '2021-2023',
                            position: 'Backend Developer',
                            summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                        },
                        {
                            companyName: 'TCS',
                            city: 'chennai',
                            duration: '2023-2025',
                            position: 'Backend Developer',
                            summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                        },
                        {
                            companyName: 'infosis',
                            city: 'bangalore',
                            duration: '2025-2034',
                            position: 'Backend Developer',
                            summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                        },
                        {
                            companyName: 'wibrow',
                            city: 'kerala',
                            duration: '2024-20240',
                            position: 'Backend Developer',
                            summary: 'i am working in that file since 2021. i have working in that field with node js and angular'
                        }
                    ],
                    education: [
                        {
                            collageName: 'S.K.P Engineering College',
                            branchName: 'Computer Science And Engineering',
                            duration: '2017 - 2021',
                            degreeName: 'B.E'
                        },
                        {
                            collageName: 'S.K.P Engineering College',
                            branchName: 'Computer Science And Engineering',
                            duration: '2024 - 2026',
                            degreeName: 'M.E'
                        }
                    ]
                }
                await ejs.renderFile(directoryPath, async(err, data) => {
                    if(err) {
                        throw err;
                    } else {
                        mailDetails.html = data
                        await mailTransporter.sendMail(mailDetails, data, function(err, data) {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    }
                })
                channel.ack(message);
            });
        });
    }
}
