package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type TestSample struct {
	Name   string  `json:"name"`
	Amount float64 `json:"amount"`
	IsOk   bool    `json:"isOk"`
}

func CorsMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, X-CSRF-Token, Accept, Accept-Encoding, Authorization, Cache-Control, X-Requested-With, Origin")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH, PUT, POST, DELETE")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(http.StatusNoContent)
			return
		}
		ctx.Next()
	}
}

func main() {
	router := gin.Default()
	router.Use(CorsMiddleware())
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, []TestSample{
			{
				Name:   "test-1",
				Amount: 23,
				IsOk:   true,
			},
			{
				Name:   "test-2",
				Amount: 33.2,
				IsOk:   true,
			},
			{
				Name:   "test-3",
				Amount: 55,
				IsOk:   false,
			},
		})
	})

	router.GET("/detail/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		testSampleList := []TestSample{
			{
				Name:   "test-1",
				Amount: 23,
				IsOk:   true,
			},
			{
				Name:   "test-2",
				Amount: 33.2,
				IsOk:   true,
			},
			{
				Name:   "test-3",
				Amount: 55,
				IsOk:   false,
			},
		}

		for _, testSample := range testSampleList {
			if testSample.Name == name {
				ctx.JSON(http.StatusFound, testSample)
				return
			}
		}
		ctx.AbortWithStatus(http.StatusNotFound)
	})
	router.Run(":8081")
}
