import user from "../models/User.js"

class UserController {

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

    static async CadastraUser (req, res) {
        try{
            const novoUser = await user.create(req.body);
            res.status(201).json({ message: "criado com sucesso", user: novoUser });
        } catch ( erro )
        {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar` });
        }
    };

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

};

export default UserController; 