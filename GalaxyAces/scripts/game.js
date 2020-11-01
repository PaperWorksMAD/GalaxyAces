<script>
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update 
        }
    };

    var game = new Phaser.Game(config);
    var fondo;

    function preload ()
    {
        this.load.image('fondo','resources/images/fondo.jpg');
    }

    function create ()
    {
        fondo = this.add.tileSprite(400, 300, 800, 600, 'fondo');
    }

function update ()
{
fondo.tilePositionY += 1;
}
    </script>