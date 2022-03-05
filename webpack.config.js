// Plugin che ci permette di utilizzare un template nel codice sorgente e ottimizzarlo per la versione che andrà online
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Libreria che ci permette di utilizzare le Environment Variables durante lo sviluppo locale
const Dotenv = require("dotenv-webpack");

// Modulo di NodeJS che dà la possibilità di interagire con file e cartelle locali
const path = require("path");


module.exports = {
        entry: {
            // Qui specifichiamo il file di ENTRATA, vedi commento sopra
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            // Una volta creato un pacchetto WebPack metterà i file risultanti nella cartella build
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "build"),
        },
        // Configurazione di un plugin, necessario per sveltire il processo di sviluppo vedi asterischi nello snippet successivo **
        devServer: {
            static: "./build",
            open: true,
        },
        plugins: [
            // Plugin che prende un template e lo personalizza, completandolo con scripts ed eventuali stili
            new HtmlWebpackPlugin({
                title: "Coming Home",
                template: path.resolve(__dirname, "./src/index.html"),
                favicon: './src/assets/img/favicon.ico'
            }),

            //Qui dotenv-webpack viene inizializzato
            new Dotenv(),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },
};