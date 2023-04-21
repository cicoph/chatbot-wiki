import { PrismaClient, Prisma } from '@prisma/client'
import sha256 from "crypto-js/sha256"

const prisma = new PrismaClient()
const hashPassword = (password: string) => {
  return sha256(password).toString();
};
type userData = {
  name: string,
  email: string,
  password: string,
  conversation?: any
}
const userData: userData[] = [
  {
    name: 'Francesco',
    email: 'francescoloddo@gmail.com',
    password: hashPassword('@Assist2023'),
    conversation: {
      create: {
        version: 4,
        history: [
          {
            id: "e4a09580-a154-4929-90a2-96b47174b699",
            name: "Scrivi un contenuto introdutti...",
            messages: [
              {
                role: "user",
                content: "Scrivi un contenuto introduttivo per la pagina web servizi di un'azienda calabrese che si occupa di trasporto auto e merci su strada. L'azienda esiste da più di 40 anni"
              },
              {
                role: "assistant",
                content: "Benvenuto nella pagina dei servizi della nostra azienda di trasporto auto e merci su strada. Siamo un'azienda calabrese con oltre 40 anni di esperienza nel settore del trasporto e della logistica. Siamo specializzati nel trasporto di veicoli, sia nuovi che usati, in tutta Italia e all'estero, offrendo un servizio di qualità e affidabilità.\n\nInoltre, ci occupiamo anche del trasporto di merci su strada, offrendo soluzioni personalizzate per le esigenze dei nostri clienti. Grazie alla nostra flotta di mezzi moderni e ad alta tecnologia, siamo in grado di garantire spedizioni rapide e sicure, sia nazionali che internazionali.\n\nLa nostra esperienza e la nostra professionalità nel settore ci permettono di offrire un servizio completo e personalizzato, dalle fasi iniziali dell'organizzazione del trasporto fino alla consegna finale della merce. Inoltre, siamo sempre attenti all'evoluzione del mercato e delle normative, per garantire la massima efficienza e sicurezza nei nostri servizi.\n\nSiamo consapevoli dell'importanza della soddisfazione del cliente e per questo ci impegniamo costantemente a migliorare i nostri servizi e a fornire un'assistenza completa e tempestiva. Grazie alla nostra esperienza e alla nostra attenzione alle esigenze del cliente, siamo in grado di garantire un servizio di trasporto professionale, affidabile e personalizzato.\n\nScegliere la nostra azienda significa affidarsi ad esperti del settore, capaci di garantire la massima qualità e affidabilità nel trasporto di auto e merci su strada. Contattaci per maggiori informazioni sui nostri servizi e per richiedere un preventivo personalizzato."
              },
              {
                role: "user",
                content: "Sei un assistente per la scrittura dei contenuti. Non salutare con il benvenuto quando inizi una frase. Scrivi in prima persona singolare e rivolgiti a me in seconda persona singolare. Ricordati che sei un esperto SEO quindi i tuoi contenuti devono tenere essere orientati al posizionamento sui motori di ricerca come Google. Evita sempre le ripetizioni di testo e concetti."
              },
              {
                role: "assistant",
                content: "Assisterti nella scrittura dei contenuti per la pagina dei servizi della nostra azienda di trasporto auto e merci su strada è un piacere. Come esperto SEO, posso garantirti che i nostri servizi sono pensati per soddisfare le esigenze dei nostri clienti e favorire il posizionamento sui motori di ricerca come Google.\n\nSiamo un'azienda calabrese con oltre 40 anni di esperienza nel settore del trasporto e della logistica. Il nostro obiettivo è fornire un servizio completo e personalizzato, dall'organizzazione del trasporto alla consegna finale della merce, garantendo sempre la massima efficienza e sicurezza.\n\nCi occupiamo del trasporto di veicoli, sia nuovi che usati, in tutta Italia e all'estero, grazie alla nostra flotta di mezzi moderni e ad alta tecnologia. Inoltre, offriamo soluzioni personalizzate per il trasporto di merci su strada, sia nazionali che internazionali.\n\nLa nostra esperienza e la nostra attenzione alle esigenze del cliente ci permettono di fornire un servizio di qualità, affidabilità e tempestività. Siamo sempre aggiornati sulle normative del settore e sulle evoluzioni del mercato, per garantire la massima efficienza nei nostri servizi.\n\nSiamo consapevoli dell'importanza della soddisfazione del cliente e per questo ci impegniamo costantemente a migliorare i nostri servizi e a fornire un'assistenza completa e personalizzata.\n\nScegliere la nostra azienda significa affidarsi ad esperti del settore, capaci di garantire la massima qualità e affidabilità nel trasporto di auto e merci su strada. Contattaci per maggiori informazioni sui nostri servizi e per richiedere un preventivo personalizzato."
              },
              {
                role: "user",
                content: "Non introdurre le tue intenzioni o cosa sei. Scrivi solo il contenuto necessario per il sito web"
              },
              {
                role: "assistant",
                content: "La nostra azienda di trasporto auto e merci su strada ha oltre 40 anni di esperienza nel settore del trasporto e della logistica. Offriamo un servizio di trasporto di veicoli, sia nuovi che usati, in tutta Italia e all'estero, grazie alla nostra flotta di mezzi moderni e ad alta tecnologia. Inoltre, offriamo soluzioni personalizzate per il trasporto di merci su strada, sia nazionali che internazionali.\n\nLa nostra esperienza e la nostra attenzione alle esigenze del cliente ci permettono di fornire un servizio di qualità, affidabilità e tempestività, garantendo sempre la massima efficienza e sicurezza.\n\nCi impegniamo costantemente a migliorare i nostri servizi e a fornire un'assistenza completa e personalizzata, per garantire la massima soddisfazione del cliente.\n\nScegliere la nostra azienda significa affidarsi ad esperti del settore, capaci di garantire la massima qualità e affidabilità nel trasporto di auto e merci su strada. Contattaci per maggiori informazioni sui nostri servizi e per richiedere un preventivo personalizzato."
              },
              {
                role: "user",
                content: "L'azienda è dotata di una flotta di mezzi 49 bisarche, 10 tir container e 10 telonati, 80 motrici e 70 refrigerati. Inoltre ha due mezzi per i trasporti eccezionali. Adesso che sai queste informazioni, scrivi il contenuto per la pagina Flotta del sito web"
              },
              {
                role: "assistant",
                content: "La nostra azienda di trasporto auto e merci su strada dispone di una vasta flotta di mezzi moderni ed efficienti, per garantire il miglior servizio ai nostri clienti.\n\nLa nostra flotta è composta da 49 bisarche, 10 tir container e 10 telonati, 80 motrici e 70 mezzi refrigerati. Questa vasta gamma di mezzi ci permette di gestire efficacemente e con la massima flessibilità qualsiasi tipo di trasporto, sia nazionale che internazionale.\n\nInoltre, per i trasporti eccezionali, disponiamo di due mezzi appositamente attrezzati per garantire la massima sicurezza e l'adeguato trasporto delle merci più ingombranti.\n\nLa nostra flotta è costantemente sottoposta a controlli e manutenzione, per garantire la massima efficienza e sicurezza durante i trasporti. La scelta dei mezzi più adatti alle esigenze del cliente è una delle nostre priorità, per garantire sempre un servizio personalizzato e di qualità.\n\nScegliere la nostra azienda di trasporto auto e merci su strada significa affidarsi a un'esperienza consolidata e a una flotta di mezzi moderni ed efficienti. Contattaci per maggiori informazioni sui nostri servizi e per richiedere un preventivo personalizzato."
              },
              {
                role: "user",
                content: "scrivi un titolo breve per il contenuto precedente, senza usare la parola: \"nostra\""
              },
              {
                role: "assistant",
                content: "Flotta di mezzi per il trasporto auto e merci su strada"
              }
            ],
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            prompt: "Sei un assistente per la scrittura dei contenuti. Non salutare quando inizi una frase. Scrivi in prima persona singolare e rivolgiti a me in seconda persona singolare. Ricordati che sei un esperto SEO quindi i tuoi contenuti devono tenere essere orientati al posizionamento sui motori di ricerca come Google. Evita sempre le ripetizioni di testo e concetti.",
            temperature: 0.8,
            folderId: "ac8c9e7e-959f-4cd9-9a3c-63588f72170d"
          },
          {
            id: "b1d61219-ed6b-4c29-a995-c39b6a583fb2",
            name: "Crea il codice PHP per inserir...",
            messages: [
              {
                role: "user",
                content: "Crea il codice PHP per inserire i snippet strutturati di una scheda prodotto utilizzando Wordpress e Woocommerce"
              },
              {
                role: "assistant",
                content: "Per inserire gli snippet strutturati di una scheda prodotto utilizzando WordPress e WooCommerce, è necessario utilizzare il markup schema.org. Ecco un esempio di codice PHP per inserire gli snippet strutturati di una scheda prodotto:\n\n```\n<?php\n// Recupera le informazioni del prodotto\nglobal $product;\n$sku = $product->get_sku();\n$name = $product->get_name();\n$description = $product->get_description();\n$price = $product->get_price();\n$image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );\n\n// Costruisce il markup schema.org\n$markup = '<script type=\"application/ld+json\">\n{\n  \"@context\": \"http://schema.org/\",\n  \"@type\": \"Product\",\n  \"sku\": \"' . $sku . '\",\n  \"name\": \"' . $name . '\",\n  \"description\": \"' . $description . '\",\n  \"image\": \"' . $image[0] . '\",\n  \"offers\": {\n    \"@type\": \"Offer\",\n    \"priceCurrency\": \"EUR\",\n    \"price\": \"' . $price . '\"\n  }\n}\n</script>';\n\n// Stampa il markup\necho $markup;\n?>\n```\n\nQuesto codice recupera le informazioni del prodotto utilizzando le funzioni di WooCommerce e costruisce il markup schema.org corrispondente. Infine, il markup viene stampato nella pagina del prodotto."
              },
              {
                role: "user",
                content: "crea una funzione per inserire questo codice all'interno dell'head del mio tema wordpress"
              },
              {
                role: "assistant",
                content: "Per inserire il codice all'interno dell'head del tuo tema WordPress, puoi utilizzare la funzione `wp_head()` di WordPress. Ecco un esempio di funzione che inserisce il markup schema.org all'interno dell'head del tuo tema:\n\n```\nfunction insert_product_schema() {\n    // Recupera le informazioni del prodotto\n    global $product;\n    $sku = $product->get_sku();\n    $name = $product->get_name();\n    $description = $product->get_description();\n    $price = $product->get_price();\n    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );\n\n    // Costruisce il markup schema.org\n    $markup = '<script type=\"application/ld+json\">\n    {\n      \"@context\": \"http://schema.org/\",\n      \"@type\": \"Product\",\n      \"sku\": \"' . $sku . '\",\n      \"name\": \"' . $name . '\",\n      \"description\": \"' . $description . '\",\n      \"image\": \"' . $image[0] . '\",\n      \"offers\": {\n        \"@type\": \"Offer\",\n        \"priceCurrency\": \"EUR\",\n        \"price\": \"' . $price . '\"\n      }\n    }\n    </script>';\n\n    // Inserisce il markup all'interno dell'head\n    echo $markup;\n}\nadd_action( 'wp_head', 'insert_product_schema' );\n```\n\nQuesta funzione utilizza l'hook `wp_head` di WordPress per inserire il markup schema.org all'interno dell'head del tuo tema. Quando un utente visualizza la pagina del prodotto, la funzione viene eseguita e il markup viene inserito nell'head."
              },
              {
                role: "user",
                content: "inserisci la condizione per aggiungere il codice solo se il post type è product"
              },
              {
                role: "assistant",
                content: "Per aggiungere il codice solo se il post type è \"product\", puoi utilizzare la funzione `is_product()` di WooCommerce. Ecco un esempio di funzione che inserisce il markup schema.org solo se il post type è \"product\":\n\n```\nfunction insert_product_schema() {\n    // Verifica se il post type è \"product\"\n    if ( ! is_product() ) {\n        return;\n    }\n\n    // Recupera le informazioni del prodotto\n    global $product;\n    $sku = $product->get_sku();\n    $name = $product->get_name();\n    $description = $product->get_description();\n    $price = $product->get_price();\n    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );\n\n    // Costruisce il markup schema.org\n    $markup = '<script type=\"application/ld+json\">\n    {\n      \"@context\": \"http://schema.org/\",\n      \"@type\": \"Product\",\n      \"sku\": \"' . $sku . '\",\n      \"name\": \"' . $name . '\",\n      \"description\": \"' . $description . '\",\n      \"image\": \"' . $image[0] . '\",\n      \"offers\": {\n        \"@type\": \"Offer\",\n        \"priceCurrency\": \"EUR\",\n        \"price\": \"' . $price . '\"\n      }\n    }\n    </script>';\n\n    // Inserisce il markup all'interno dell'head\n    echo $markup;\n}\nadd_action( 'wp_head', 'insert_product_schema' );\n```\n\nIn questa versione della funzione, viene utilizzata la condizione `if ( ! is_product() )` per verificare se il post type corrente è \"product\". Se il post type non è \"product\", la funzione esce senza inserire il markup schema.org. Se il post type è \"product\", la funzione procede a recuperare le informazioni del prodotto e a costruire il markup schema.org."
              },
              {
                role: "user",
                content: "inserisci anche la galleria prodotto di woocommerce invece della singola immagine"
              },
              {
                role: "assistant",
                content: "Per inserire la galleria prodotto di WooCommerce invece della singola immagine, puoi utilizzare la funzione `get_gallery_image_ids()` di WooCommerce per recuperare gli ID delle immagini della galleria. Ecco un esempio di funzione che inserisce il markup schema.org con la galleria prodotto:\n\n```\nfunction insert_product_schema() {\n    // Verifica se il post type è \"product\"\n    if ( ! is_product() ) {\n        return;\n    }\n\n    // Recupera le informazioni del prodotto\n    global $product;\n    $sku = $product->get_sku();\n    $name = $product->get_name();\n    $description = $product->get_description();\n    $price = $product->get_price();\n    $gallery_ids = $product->get_gallery_image_ids();\n\n    // Costruisce il markup schema.org\n    $markup = '<script type=\"application/ld+json\">\n    {\n      \"@context\": \"http://schema.org/\",\n      \"@type\": \"Product\",\n      \"sku\": \"' . $sku . '\",\n      \"name\": \"' . $name . '\",\n      \"description\": \"' . $description . '\",\n      \"image\": \"' . wp_get_attachment_image_url( get_post_thumbnail_id( $product->get_id() ), 'full' ) . '\",\n      \"offers\": {\n        \"@type\": \"Offer\",\n        \"priceCurrency\": \"EUR\",\n        \"price\": \"' . $price . '\"\n      },\n      \"additionalProperty\": [\n        {\n          \"@type\": \"PropertyValue\",\n          \"name\": \"Gallery\",\n          \"value\": [';\n\n    // Aggiunge gli URL delle immagini della galleria\n    foreach ( $gallery_ids as $gallery_id ) {\n        $markup .= '\"' . wp_get_attachment_image_url( $gallery_id, 'full' ) . '\",';\n    }\n    $markup = rtrim( $markup, ',' ); // Rimuove l'ultima virgola\n\n    $markup .= ']\n        }\n      ]\n    }\n    </script>';\n\n    // Inserisce il markup all'interno dell'head\n    echo $markup;\n}\nadd_action( 'wp_head', 'insert_product_schema' );\n```\n\nIn questa versione della funzione, viene utilizzata la funzione `get_gallery_image_ids()` di WooCommerce per recuperare gli ID delle immagini della galleria. Successivamente, viene utilizzato un ciclo `foreach` per aggiungere gli URL delle immagini della galleria al markup schema.org. Infine, viene utilizzata la proprietà `additionalProperty` di schema.org per inserire la lista di immagini della galleria."
              },
              {
                role: "user",
                content: "rimuovi il contenuto e i tag html che lo contengono da una stringa in PHP"
              },
              {
                role: "assistant",
                content: "Per rimuovere il contenuto e i tag HTML che lo contengono da una stringa in PHP, puoi utilizzare la funzione `strip_tags()`. Ecco un esempio di codice:\n\n```\n$stringa_con_html = '<p>Questo è un esempio di <strong>stringa con HTML</strong>.</p>';\n$stringa_senza_html = strip_tags( $stringa_con_html );\necho $stringa_senza_html;\n```\n\nIn questo esempio, la funzione `strip_tags()` viene utilizzata per rimuovere i tag HTML dalla stringa `$stringa_con_html`. Il risultato viene assegnato alla variabile `$stringa_senza_html` e viene stampato a schermo utilizzando la funzione `echo`. Il risultato sarà una stringa senza i tag HTML, ovvero \"Questo è un esempio di stringa con HTML.\"."
              },
              {
                role: "user",
                content: "voglio che venga rimossa anche la stringa"
              },
              {
                role: "assistant",
                content: "Per rimuovere sia il contenuto che i tag HTML che lo contengono, puoi utilizzare la funzione `strip_tags()` insieme alla funzione `trim()`. Ecco un esempio di codice:\n\n```\n$stringa_con_html = '<p>Questo è un esempio di <strong>stringa con HTML</strong>.</p>';\n$stringa_senza_html = trim( strip_tags( $stringa_con_html ) );\necho $stringa_senza_html;\n```\n\nIn questo esempio, la funzione `strip_tags()` viene utilizzata per rimuovere i tag HTML dalla stringa `$stringa_con_html`. Successivamente, la funzione `trim()` viene utilizzata per rimuovere gli spazi vuoti all'inizio e alla fine della stringa. Il risultato viene assegnato alla variabile `$stringa_senza_html` e viene stampato a schermo utilizzando la funzione `echo`. Il risultato sarà una stringa senza i tag HTML e senza la stringa \"Questo è un esempio di\", ovvero \"stringa con HTML.\"."
              },
              {
                role: "user",
                content: "non funziona "
              },
              {
                role: "assistant",
                content: "Mi scuso per l'errore nella mia risposta precedente. In effetti, la funzione `strip_tags()` rimuove solo i tag HTML dalla stringa, ma non rimuove il testo all'interno dei tag. Per rimuovere sia i tag HTML che il testo all'interno, puoi utilizzare la funzione `preg_replace()` con una espressione regolare. Ecco un esempio di codice:\n\n```\n$stringa_con_html = '<p>Questo è un esempio di <strong>stringa con HTML</strong>.</p>';\n$stringa_senza_html = preg_replace('/<[^>]*>/', '', $stringa_con_html);\n$stringa_senza_html = trim($stringa_senza_html);\necho $stringa_senza_html;\n```\n\nIn questo esempio, la funzione `preg_replace()` viene utilizzata con l'espressione regolare `/<[^>]*>/` per rimuovere tutti i tag HTML dalla stringa `$stringa_con_html`. Successivamente, la funzione `trim()` viene utilizzata per rimuovere gli spazi vuoti all'inizio e alla fine della stringa. Il risultato viene assegnato alla variabile `$stringa_senza_html` e viene stampato a schermo utilizzando la funzione `echo`. Il risultato sarà una stringa senza i tag HTML e senza la stringa \"Questo è un esempio di\", ovvero \"stringa con HTML.\"."
              },
              {
                role: "user",
                content: "non funziona"
              },
              {
                role: "assistant",
                content: "Mi scuso per l'errore nella mia risposta precedente. In effetti, la funzione `preg_replace()` che ho suggerito non funziona correttamente per rimuovere il testo all'interno dei tag HTML. In alternativa, puoi utilizzare la libreria PHP DOM per rimuovere sia i tag HTML che il testo all'interno. Ecco un esempio di codice:\n\n```\n$stringa_con_html = '<p>Questo è un esempio di <strong>stringa con HTML</strong>.</p>';\n$dom = new DOMDocument();\n$dom->loadHTML($stringa_con_html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);\n$stringa_senza_html = $dom->textContent;\n$stringa_senza_html = trim($stringa_senza_html);\necho $stringa_senza_html;\n```\n\nIn questo esempio, la libreria PHP DOM viene utilizzata per caricare la stringa HTML nella variabile `$dom`. Successivamente, la funzione `textContent` viene utilizzata per estrarre solo il testo dalla variabile `$dom`, rimuovendo sia i tag HTML che il testo all'interno. Infine, la funzione `trim()` viene utilizzata per rimuovere gli spazi vuoti all'inizio e alla fine della stringa. Il risultato viene assegnato alla variabile `$stringa_senza_html` e viene stampato a schermo utilizzando la funzione `echo`. Il risultato sarà una stringa senza i tag HTML e senza la stringa \"Questo è un esempio di\", ovvero \"stringa con HTML.\"."
              },
              {
                role: "user",
                content: "crea un espressione regolare per rimuovere tag HTML e contenuto interno al tag da una stringa"
              },
              {
                role: "assistant",
                content: "Puoi utilizzare l'espressione regolare `/<[^>]*>(.*?)<\\/[^>]*>/` per rimuovere i tag HTML e il contenuto interno al tag da una stringa. Ecco un esempio di codice:\n\n```\n$stringa_con_html = '<p>Questo è un esempio di <strong>stringa con HTML</strong>.</p>';\n$stringa_senza_html = preg_replace('/<[^>]*>(.*?)<\\/[^>]*>/', '', $stringa_con_html);\n$stringa_senza_html = trim($stringa_senza_html);\necho $stringa_senza_html;\n```\n\nIn questo esempio, la funzione `preg_replace()` viene utilizzata con l'espressione regolare `/<[^>]*>(.*?)<\\/[^>]*>/` per rimuovere tutti i tag HTML e il contenuto interno al tag dalla stringa `$stringa_con_html`. Successivamente, la funzione `trim()` viene utilizzata per rimuovere gli spazi vuoti all'inizio e alla fine della stringa. Il risultato viene assegnato alla variabile `$stringa_senza_html` e viene stampato a schermo utilizzando la funzione `echo`. Il risultato sarà una stringa senza i tag HTML e senza il contenuto interno al tag, ovvero \"Questo è un esempio di.\"."
              },
              {
                role: "user",
                content: "aggiungi allo schema precedente aggregate rating"
              },
              {
                role: "assistant",
                content: "Per aggiungere l'Aggregate Rating allo schema precedente, puoi utilizzare la proprietà `aggregateRating` di schema.org. Ecco un esempio di codice:\n\n```\nfunction insert_product_schema() {\n    // Verifica se il post type è \"product\"\n    if ( ! is_product() ) {\n        return;\n    }\n\n    // Recupera le informazioni del prodotto\n    global $product;\n    $sku = $product->get_sku();\n    $name = $product->get_name();\n    $description = $product->get_description();\n    $price = $product->get_price();\n    $gallery_ids = $product->get_gallery_image_ids();\n    $average_rating = $product->get_average_rating();\n    $review_count = $product->get_review_count();\n\n    // Costruisce il markup schema.org\n    $markup = '<script type=\"application/ld+json\">\n    {\n      \"@context\": \"http://schema.org/\",\n      \"@type\": \"Product\",\n      \"sku\": \"' . $sku . '\",\n      \"name\": \"' . $name . '\",\n      \"description\": \"' . $description . '\",\n      \"image\": \"' . wp_get_attachment_image_url( get_post_thumbnail_id( $product->get_id() ), 'full' ) . '\",\n      \"offers\": {\n        \"@type\": \"Offer\",\n        \"priceCurrency\": \"EUR\",\n        \"price\": \"' . $price . '\"\n      },\n      \"additionalProperty\": [\n        {\n          \"@type\": \"PropertyValue\",\n          \"name\": \"Gallery\",\n          \"value\": [';\n\n    // Aggiunge gli URL delle immagini della galleria\n    foreach ( $gallery_ids as $gallery_id ) {\n        $markup .= '\"' . wp_get_attachment_image_url( $gallery_id, 'full' ) . '\",';\n    }\n    $markup = rtrim( $markup, ',' ); // Rimuove l'ultima virgola\n\n    $markup .= ']\n        }\n      ],\n      \"aggregateRating\": {\n        \"@type\": \"AggregateRating\",\n        \"ratingValue\": \"' . $average_rating . '\",\n        \"reviewCount\": \"' . $review_count . '\"\n      }\n    }\n    </script>';\n\n    // Inserisce il markup all'interno dell'head\n    echo $markup;\n}\nadd_action( 'wp_head', 'insert_product_schema' );\n```\n\nIn questo esempio, vengono utilizzate le funzioni `get_average_rating()` e `get_review_count()` di WooCommerce per recuperare l'Average Rating e il numero di recensioni del prodotto. Successivamente, viene utilizzata la proprietà `aggregateRating` di schema.org per inserire queste informazioni nel markup schema.org. Il risultato sarà una stringa con il markup schema.org che include anche l'Aggregate Rating del prodotto."
              }
            ],
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            prompt: "Sei uno sviluppatore PHP che conosche wordpress e woocommerce",
            temperature: 0.2,
            folderId: null
          },
          {
            id: "e74f6ed0-4ff4-4c4a-9ae8-0d4c1a695638",
            name: "Anice Forte",
            messages: [
              {
                role: "user",
                content: "Puoi scrivermi un contenuto breve per descrivere le caratteristiche di un prodotto composto da anice verde e anice stellato. Il prodotto si chiama {{Anice forte}} 70cl e 40% di volume alcolico. Ottima da gustare liscia con ghiaccio e acqua. Ideale per realizzare dolci e cocktail"
              },
              {
                role: "assistant",
                content: "Benvenuto! Oggi ti parlerò di un prodotto davvero speciale: l'{{Anice forte}} 70cl, composto da anice verde e anice stellato. Questa bevanda è caratterizzata da un volume alcolico del 40% e si presenta come un'ottima scelta per chi vuole gustare un drink dal sapore intenso e deciso.\n\nL'{{Anice forte}} 70cl è perfetto da gustare liscio, magari accompagnato da un po' di ghiaccio e acqua, ma anche per realizzare dolci e cocktail dal sapore unico e inconfondibile.\n\nGrazie alla presenza dell'anice verde e dell'anice stellato, questa bevanda regala un'esperienza gustativa unica, capace di soddisfare anche i palati più esigenti. Inoltre, grazie alla sua composizione, l'{{Anice forte}} 70cl è un prodotto ideale per chi cerca un'alternativa alle classiche bevande alcoliche.\n\nSe stai cercando un prodotto di alta qualità, dal sapore intenso e versatile, non puoi non provare l'{{Anice forte}} 70cl. Grazie alla sua composizione unica e alla sua versatilità, questa bevanda è in grado di soddisfare ogni esigenza e di regalare un'esperienza gustativa indimenticabile."
              }
            ],
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            prompt: "Sei un assistente per la scrittura dei contenuti. Non salutare quando inizi una frase. Scrivi in prima persona singolare e rivolgiti a me in seconda persona singolare. Ricordati che sei un esperto SEO quindi i tuoi contenuti sono orientati al posizionamento sui motori di ricerca. Hai come obiettivo il posizionamento su Google. Evita le ripetizioni di testo e dei concetti, anche in frasi differenti.",
            temperature: 0.2,
            folderId: "8fa08826-d21c-4c8e-914d-aad1855abf51"
          },
          {
            id: "5f761568-32c1-4b8b-80ef-814640fde51e",
            name: "Non introdurre le tue intenzio...",
            messages: [
              {
                role: "user",
                content: "Non introdurre le tue intenzioni o cosa sei. Scrivi solo il contenuto necessario per il sito web che si adatti al posizionamento del prodotto sui motori di ricerca. La parola chiave è liquore sambuca Calabria"
              },
              {
                role: "assistant",
                content: "Benvenuto sul nostro sito web, dove puoi trovare informazioni dettagliate sul liquore sambuca prodotto in Calabria. Se sei un appassionato di liquori, sicuramente conosci la sambuca, un distillato di anice molto popolare in Italia e all'estero. La sambuca prodotta in Calabria è particolarmente apprezzata per la sua alta qualità e il suo sapore unico.\n\nIl liquore sambuca Calabria è ottenuto dalla distillazione di anice stellato e altre erbe aromatiche, che gli conferiscono il suo caratteristico aroma e sapore. La produzione di sambuca in Calabria ha una lunga tradizione, che risale almeno al XVIII secolo. Oggi, la sambuca calabrese è apprezzata in tutto il mondo per la sua qualità e il suo sapore unico.\n\nIl liquore sambuca Calabria si può gustare liscio, con ghiaccio o come ingrediente per cocktail. È perfetto per concludere una cena o per un aperitivo con gli amici. Inoltre, la sambuca calabrese è spesso utilizzata in cucina per aromatizzare dolci e dessert.\n\nSe sei alla ricerca di un liquore di alta qualità e dal sapore unico, il liquore sambuca Calabria è sicuramente una scelta eccellente. Grazie alla sua lunga tradizione e alla sua alta qualità, questo liquore è apprezzato in tutto il mondo e rappresenta un'eccellenza del Made in Italy."
              }
            ],
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            prompt: "Sei un assistente per la scrittura dei contenuti. Non salutare quando inizi una frase. Scrivi in prima persona singolare e rivolgiti a me in seconda persona singolare. Ricordati che sei un esperto SEO quindi i tuoi contenuti sono orientati al posizionamento sui motori di ricerca. Hai come obiettivo il posizionamento su Google. Evita le ripetizioni di testo e dei concetti, anche in frasi differenti.",
            temperature: 0.2,
            folderId: "8fa08826-d21c-4c8e-914d-aad1855abf51"
          }
        ],
        folders: [
          {
            id: "8fa08826-d21c-4c8e-914d-aad1855abf51",
            name: "Danny non può",
            type: "chat"
          },
          {
            id: "10bb7731-f4e2-458b-bbdb-80a2c06bead6",
            name: "Formale",
            type: "prompt"
          }
        ],
        prompts: [
          {
            id: "5d26df76-1adc-46b7-a80f-2ff9b277e42b",
            name: "Informale",
            description: "",
            content: "Sei un assistente per la scrittura dei contenuti. Non salutare con il benvenuto quando inizi una frase. Scrivi in prima persona singolare e rivolgiti a me in seconda persona singolare. Ricordati che sei un esperto SEO quindi i tuoi contenuti devono tenere essere orientati al posizionamento sui motori di ricerca come Google. Evita sempre le ripetizioni di testo e concetti.",
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            folderId: null
          },
          {
            id: "71ef4dff-87a6-420a-92f2-b1848480f8d9",
            name: "Carpentieri liquori",
            description: "",
            content: "Non introdurre le tue intenzioni o cosa sei. Scrivi solo il contenuto necessario per il sito web che si adatti al posizionamento del prodotto sui motori di ricerca. La parola chiave è liquore sambuca Calabria",
            model: {
              id: "gpt-3.5-turbo",
              name: "GPT-3.5",
              maxLength: 12000,
              tokenLimit: 4000
            },
            folderId: "10bb7731-f4e2-458b-bbdb-80a2c06bead6"
          }
        ]
      }
    }
  },
  {
    name: 'Domenico',
    email: 'knulpi@gmail.com',
    password: hashPassword('@Assist2023')
  }
]



async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })