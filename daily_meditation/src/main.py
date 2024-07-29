from flask import Flask, jsonify, request
from services.get_backup_meditation import GetBackupMeditation
from services.get_meditation_from_web import GetMeditationFromWeb
from controller.entry_point import EntryPointHttp

app = Flask(__name__)

# Função principal para inicializar os serviços e o controller
def main():
    backup_url = "src/backup/file.json"
    get_backup_meditation = GetBackupMeditation(backup_url)
    get_meditation_from_web = GetMeditationFromWeb()
    global controller  # Torna o controller acessível globalmente
    controller = EntryPointHttp(get_backup_meditation, get_meditation_from_web)

# Rota principal que utiliza o controller
@app.route("/<meditation_type>", methods=["GET"])
def meditation(meditation_type):
    # Aqui você pode chamar os métodos do seu controller
    response = controller.process_message(meditation_type)  # Substitua `some_method` pelo método desejado do seu controller
    print(response)
    if response == "Invalid message":
        return jsonify({"message": "Invalid message"})
    return jsonify({
        "titulo": response.title,
        "texto": response.content,
        "image": response.image
    })

if __name__ == '__main__':
    main()
    app.run(debug=True, port=3000)
