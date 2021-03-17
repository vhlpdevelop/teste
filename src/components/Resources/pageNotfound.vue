<template>
<v-main>
    <head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/4b9ba14b0f.js" crossorigin="anonymous"></script>
</head>
<body id="Abody">
  <div id="mainbox">
    <div id="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div id="err2">4</div>
    <div id="msg">A página sumiu? Foi deletada? Está se escondendo da quarentena? Talvez nunca tenha existido?<p>Vamos para o <a href="/home">ínicio</a> e tentar denovo.</p></div>
      </div>
</body>
</v-main>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    #Abody {
  background-color: #95c2de;
}

#mainbox {
  background-color: #95c2de;
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

  #err {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 20%;
    top: 8%;
  }

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: #ffffff;
}

 #err2 {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 68%;
    top: 8%;
  }

#msg {
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    position:absolute;
    left: 16%;
    top: 45%;
    width: 75%;
  }

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}
</style>