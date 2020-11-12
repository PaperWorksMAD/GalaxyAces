# GALAXY ACES

## Grupo-J 

**- DESCRIPCIÓN DE LA TEMATICA -**

* En una galaxia separada por clanes, el prestigio personal y de los tuyos es clave para ser respetado y temido en un espacio hostil, repleto de conflictos, es por esto que los mejores pilotos de cada región compiten contra otros para aumentar su estatus y el de su clan. Aces es el termino ingles de As de la aviación, un aviador militar condecorado tras haber logrado el derribo de cinco o más aviones enemigos, hemos querido adaptar este término para dar nombre a nuestro juego, donde eres un piloto de una nave espacial, en la galaxia que compite con otro por la gloria de su región.

* [Información extra sobre As de Aviación](https://www.ecured.cu/Pilotos_ases#Historia)

**- JUEGO -**

* Nuestro objetivo como jugador será destruir el mayor número de enemigos posibles, para obtener una mayor puntuación que nuestro rival, dentro del tiempo de la partida. Para ello contaremos con una nave capaz de desplazarse en las cuatro cardinalidades y disparar proyectiles letales. Los jugadores también podrán ayudarse de mejoras que aparece en el escenario para beneficiarse de sus efectos o fastidiar a su adversario.


***- INTEGRANTES DEL EQUIPO DE DESARROLLO -***

|Nombre y Apellidos       |Correo de la universidad         |Cuenta de GitHub       |
|-------------------------|---------------------------------|-----------------------|
| Jesús Ayala Matarin     |j.ayala.2016@alumnos.urjc.es     |JesusAyalaMatarin      |
| Borja Santiago Guerra   |b.santiago.2018@alumnos.urjc.es  |MrPotato027            |
| Juan Antonio Piña Ramos |ja.pinar.2017@alumnos.urjc.es    |SouthBarbol            |
| Lucas Hernández Luelmo  |l.hernandezl.2018@alumnos.urjc.es|Lucas-WiNNeR           |
| Felipe Bermejo Montejo  |f.bermejo.2018@alumnos.urjc.es   |FelipeBermejo          |

**- REDES SOCIALES -**

* https://twitter.com/PaperWorks20?s=08
* https://instagram.com/paperworksmad?igshid=o8yihq3trod3

**- TRELLO -**

* https://trello.com/b/xLL5BzgT/jer-j

# FASE 1
* Github Pages: https://paperworksmad.github.io/GalaxyAces/

# GDD

![](https://cdn.discordapp.com/attachments/766341678516404347/768129842734432276/logo2.PNG)

### Juegos en Red Grupo J

## 1. Conceptos generales

### Título:
* Galaxy Aces.

### Estudio y desarrolladores
* El estudio encargado de este proyecto es PaperWorks Studio. Su equipo está formado por:
    * Jesús Ayala Matarin
    * Borja Santiago Guerra
    * Juan Antonio Piña Ramos
    * Lucas Hernández Luelmo
    * Felipe Bermejo Montejo

### Plataforma
* Este proyecto se desarrollará para PC (en navegadores web) y en dispositivos móviles.

### Alcance
* Por ahora no está prevista su expansión a otros títulos o DLC´s, dependerá del cliente.

### Licencia
* Está basado en una idea original, influenciada por el estilo y aspecto del conocido juego Space Invaders.

### Sinopsis de jugabilidad y diseño
* Juego multijugador 1v1 de combate entre naves en tiempo real. Los jugadores escogen una nave y deben de competir por destruir al mayor número de enemigos en un mismo escenario y utilizando herramientas como power ups que te benefician a ti o perjudican al otro jugador.

### Categoría
* La clasificación del juego sería PEGI 3. Se trata de un juego de acción, estrategia y multijugador 1v1.

### Mecánica
*  El jugador controlará una única nave. Dicha nave puede hacer estas acciones:
    * Moverse en cualquier dirección.
    * Disparar.
    * Recibir daño.
* El apuntado de la nave es automático desde donde se encuentre el jugador hacia la parte superior.
* En el modo multijugador se enfrentan dos jugadores para:
    * Destruir más enemigos que tu rival 
    * Obtener más puntos en el tiempo de la partida que el rival

### Tecnología
* Programación:
    * Sublime Text 3.
* Concept:
    * A mano.
    * Photoshop.
    * Procreate.
    * OpenGameArt.
* Bocetos finales:
    * Photoshop.
    * Procreate.
* Organización del equipo:
    * Trello.
* Almacenaje y compartición de proyecto:
    * Github.

### Público
* La franja de edad a la que orientamos nuestro juego es a todos los públicos, centrado en los rango de edad de entre 10 y 25. Y sobretodo a jugadores casuales de juegos multijugador.

* Estilo visual
    * Pixel art.
 
## 2. Referencias
    
![](https://cdn.discordapp.com/attachments/766341678516404347/768527792920461333/41FMxfRCatL.png)

                      Space Invaders
                      
![](https://cdn.discordapp.com/attachments/766341678516404347/768527695705145385/galaga.png)

                                             Galaga
                                             
## 3. Visión general del juego

* La idea general del juego tiene como base plantear una competición entre dos jugadores a través de un modo multijugador que actúa como modo principal y único.
* El juego destacará por su frenetismo, su carácter desenfadado bajo una estética simple colorida e inmersiva, y por la competitividad entre jugadores nacida del deseo de supervivencia.

## 4. Mecánicas del juego

* Tipo de cámara: 
    * 2D.
    * Cenital.
    
* Controles: 
    * Controles de movimiento por el eje XY y disparar:
        * PC:
            * Jugador 1: para moverse con WASD y para disparar ESPACIO
            * Jugador 2: para moverse con las flechas y para disparar ENTER
        * Móviles y tablets:
            * Por determinar
            
* Pntuación:
    * 2 marcadores de puntuación bonificados al disparar y matar enemigos.
    * Varía dependiendo del enemigo.
    * El juego se ganará consiguiendo el mayor número de puntos en un tiempo determinado.
    
* Guardado y carga: 
     * No hay, son partidas rápidas.
     
* Jugabilidad: 
    * Jugabilidad dinámica y competitiva con tiempo de reacción limitado debido a la aproximación progresiva de los enemigos.
    * En la partida ambos jugadores compartirán la misma cámara y podrán moverse dentro de ella, atacar a los enemigos.
    * Cada personaje dispondrá de un indicador de su vida (J1 en la parte superior izquierda, J2 superior derecha), y un indicador único del tiempo restante para       finalizar la partida centrado en la parte superior.
    * Cada cierto tiempo se generarán orbes que contendrán mejoras para ti o obstáculos para tu enemigo.

* Niveles: 
      * 1 pantalla (por ahora).
      
* Habilidades: 
    * Disparo doble. 
    * Movimiento rápido. 
    * Movimiento lento (rival)
    * Congelación (rival)
    * etc
    
* Recursos :
    * cada nave posee disparos ilimitados con cierto cooldown y podrá recoger una serie de power-ups emergentes que sí son limitados.
    
## 5. Estados del juego:
* Pantalla de inicio (logo de empresa y título del juego)
* Menú principal (se elige entre jugar en local o online).
* Partida - Local.
* Fin de partida - Local.
* Pantalla de selección de nave - Online.
* Pantalla de búsqueda - Online.
* Partida - Online.
* Fin de partida - Online.
* Pantalla de ajustes.
* Pantalla de créditos y contacto.
* Se irán añadiendo más.


    











