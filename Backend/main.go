package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
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
func insertCar(w http.ResponseWriter, r *http.Request) {
	var tempCar Car
	w.Header().Add("content-type", "application/json")
	json.NewDecoder((r.Body)).Decode(&tempCar)
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
	newLog("INSERT")
}

func updateCar(w http.ResponseWriter, r *http.Request) {
	var Cars []Car
	w.Header().Add("content-type", "application/json")
	json.NewDecoder((r.Body)).Decode(&Cars)
	fmt.Println("flag 1")
	collection := client.Database("db").Collection("cars")
	fmt.Println("flag 2")
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("flag 3")
	fmt.Println(Cars)
	filter := bson.M{"placa": Cars[0].Placa}
	//update := bson.D{{"$set", Cars[1]}}
	result, er := collection.ReplaceOne(ctx, filter, Cars[1])
	fmt.Println("flag 4")
	fmt.Println(er)
	json.NewEncoder(w).Encode(result)
	//fmt.Println("flag 5")
	errorResponse(w, "Archivo Recibido", http.StatusOK)
	newLog("UPDATE")
}

func deleteCar(w http.ResponseWriter, r *http.Request) {
	var delCar Car
	w.Header().Add("content-type", "application/json")
	json.NewDecoder((r.Body)).Decode(&delCar)
	collection := client.Database("db").Collection("cars")
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	if err != nil {
		fmt.Println(err)
	}
	filter := bson.M{"placa": delCar.Placa}
	//update := bson.D{{"$set", Cars[1]}}
	//result, er := collection.ReplaceOne(ctx, filter, Cars[1])
	result, er := collection.DeleteOne(ctx, filter)
	fmt.Println("flag 4")
	fmt.Println(er)
	json.NewEncoder(w).Encode(result)
	//fmt.Println("flag 5")
	errorResponse(w, "Archivo Recibido", http.StatusOK)
	newLog("DELETE")
}

func getCars(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	var listCars []Car
	collection := client.Database("db").Collection("cars")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var car Car
		cursor.Decode(&car)
		listCars = append(listCars, car)
	}
	fmt.Println(listCars)
	json.NewEncoder(w).Encode(listCars)
	newLog("GET")
}

func newLog(Type string) { //
	t := time.Now()
	fecha := fmt.Sprintf("%d-%02d-%02dT%02d:%02d:%02d",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())
	log := Logs{Type: Type, Time: fecha}
	collection := client.Database("db").Collection("logs")
	fmt.Println("flag 2")
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	if err != nil {
		fmt.Println(err)
	}
	result, er := collection.InsertOne(ctx, log)
	if er != nil {
		fmt.Println(er)
	}
	fmt.Println(result)
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
	client, _ = mongo.Connect(ctx, options.Client(), options.Client().ApplyURI("mongodb://database:8080"))
	router := mux.NewRouter()
	fmt.Println("SERVIDOR EN EL PUERTO 4000")
	router.HandleFunc("/insertCar", insertCar).Methods("POST")
	router.HandleFunc("/updateCar", updateCar).Methods("PUT")
	router.HandleFunc("/deleteCar", deleteCar).Methods("DELETE")
	router.HandleFunc("/getCars", getCars).Methods("GET")
	log.Fatal(http.ListenAndServe(":4000", router))
	defer client.Disconnect(ctx)
}
