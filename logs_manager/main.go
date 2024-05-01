package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Olá, Mundo!") // Escreve "Olá, Mundo!" na resposta
}

func main() {
	http.HandleFunc("/", handler) // Define um handler para a rota "/"
	fmt.Println("Servidor rodando em http://localhost:8080")
	http.ListenAndServe(":8080", nil) // Inicia o servidor na porta 8080
}
