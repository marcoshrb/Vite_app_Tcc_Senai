import bcrypt from 'bcryptjs';
import user from "../models/User.js"
import nodemailer from 'nodemailer';
import crypto from 'crypto';

class UserController {

    static async Login(req, res) {
        const { nome, senha } = req.body;
        
        try {
            const userEncontrado = await user.findOne({ nome });

            if (!userEncontrado) {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }

            const senhaValida = await bcrypt.compare(senha, userEncontrado.senha);

            if (!senhaValida) {
                return res.status(401).json({ message: "Senha incorreta" });
            }

            const token = "exemplo_de_token";

            res.status(200).json({ message: "Login bem-sucedido", token });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na autenticação` });
        }
    }

    
    static async ListarUsers (req, res) {
        try{
            const listaUsers = await user.find({});
            res.status(200).json(listaUsers);
        } catch (erro) {
            res.status(500).json({ message : `${erro.message} - falha na requisição` });
        }
    };

    static async ListaUserProId (req, res) {
        try{
            const id = req.params.id;
            const UserEncontrado = await user.findById(id);
            res.status(200).json(UserEncontrado);
        } catch (erro) {
            res.status(500).json({ message : `${erro.message} - falha na requisição` });
        }
    };

    static async CadastraUser(req, res) {
        try {
            const { nome, email, senha, adm } = req.body;

            const salt = await bcrypt.genSalt(10); 
            const hashedSenha = await bcrypt.hash(senha, salt); 

            const novoUser = await user.create({
                nome,
                email,
                senha: hashedSenha, 
                adm
            });

            res.status(201).json({ message: "Usuário criado com sucesso", user: novoUser });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar` });
        }
    }

    static async AtualizarUser (req, res) {
        try{
            const id = req.params.id;
            await user.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message : "user atualizado" });
        } catch (erro) {
            res.status(500).json({ message : `${erro.message} - falha na atualização` });
        }
    };

    static async DeletarUser (req, res) {
        try{
            const id = req.params.id;
            await user.findByIdAndDelete(id);
            res.status(200).json({ message : "user deletado" });
        } catch (erro) {
            res.status(500).json({ message : `${erro.message} - falha em deletar` });
        }
    };

    static async RecoverPassword(req, res) {
        const { email } = req.body;

        try {
            const userEncontrado = await user.findOne({ email });

            if (!userEncontrado) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            // Gerar código de recuperação
            const recoveryCode = crypto.randomBytes(3).toString('hex').toUpperCase();
            console.log(recoveryCode)
            userEncontrado.recoveryCode = recoveryCode;
            userEncontrado.codeExpires = Date.now() + 3600000; 
            await userEncontrado.save();

            // Configuração do transporte de e-mail
            const transporter = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.SENHA,
                },
            });

            
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Código de Recuperação de Senha',
                text: `Seu código de recuperação é ${recoveryCode}.`
            });

            res.status(200).json({ message: 'Código de recuperação enviado para o seu e-mail.' });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao enviar código` });
        }
    };

    static async VerifyCode(req, res) {
        const { email, code } = req.body;

        try {
            const userEncontrado = await user.findOne({ email });

            if (!userEncontrado || userEncontrado.recoveryCode !== code || userEncontrado.codeExpires < Date.now()) {
                return res.status(400).json({ message: 'Código inválido ou expirado.' });
            }

            res.status(200).json({ message: 'Código verificado com sucesso.' });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao verificar código` });
        }
    };
};

export default UserController; 