package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// STRUCTS
type Car struct {
	Placa  string `json:"Placa,omitempty"`
	Marca  string `json:"Marca,omitempty"`
	Modelo int    `json:"Modelo,omitempty"`
	Serie  string `json:"Serie,omitempty"`
	Color  string `json:"Color,omitempty"`
}

type Logs struct {
	Type string `json:"Type,omitempty"`
	Time string `json:"Time,omitempty"`
}

// VARIABLES
var client *mongo.Client

// PETICIONES
func getTest(w http.ResponseWriter, r *http.Request) {
	var tempCar Car
	w.Header().Add("content-type", "application/json")
	json.NewDecoder((r.Body)).Decode(&tempCar)
	/*var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&tempCar)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			errorResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			errorResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}*/
	fmt.Println("flag 1")
	collection := client.Database("db").Collection("cars")
	fmt.Println("flag 2")
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("flag 3")
	result, er := collection.InsertOne(ctx, tempCar)
	if er != nil {
		fmt.Println(er)
	}
	fmt.Println("flag 4")
	json.NewEncoder(w).Encode(result)
	fmt.Println("flag 5")
	errorResponse(w, "Archivo Recibido", http.StatusOK)

}

func newLog(w http.ResponseWriter, r *http.Request) {
	headerContentTtype := r.Header.Get("Content-Type")
	if headerContentTtype != "application/json" {
		errorResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}
	var newLog Logs
	var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newLog)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			errorResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			errorResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}
	fmt.Print("El log es ")
	fmt.Println(newLog)
	errorResponse(w, "Archivo Recibido", http.StatusOK)
}

// ERRORES DE RESPONSE
func errorResponse(w http.ResponseWriter, message string, httpStatusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatusCode)
	resp := make(map[string]string)
	resp["message"] = message
	jsonResp, _ := json.Marshal(resp)
	w.Write(jsonResp)
}

func main() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client(), options.Client().ApplyURI("mongodb://localhost:8080"))
	router := mux.NewRouter()
	fmt.Println("SERVIDOR EN EL PUERTO 4000")
	router.HandleFunc("/test", getTest).Methods("POST")
	log.Fatal(http.ListenAndServe(":4000", router))
	defer client.Disconnect(ctx)
}
