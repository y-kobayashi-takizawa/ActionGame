let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterwidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
let isJumping = false;
let upTime;
let downTime;
let displayscore = document.getElementById('score');
let score = 0;


function Jump(){
    if(isJumping)return;
    upTime = setInterval(() => {
        if(characterBottom >= groundHeight + 250){
            clearInterval(upTime);
            downTime = setInterval(() => {
                if(characterBottom <= groundHeight + 10){
                    clearInterval(downTime);
                    isJumping = false;
                    
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom +'px';
            }, 20);
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    }, 20);
}
function showscore(){
    score++;
    displayscore.innerText = score;   
}
setInterval(showscore, 100);
function generateobstacle(){
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class','obstacle');
    obstacles.appendChild(obstacle);
    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    let obstacleRight = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = `reg(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    
    function moveObstacle(){
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';
        if(characterRight >= obstacleRight - characterwidth && characterRight <= obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight){
            console.log('Hit!');
            alert('Game over! your score is: '+score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            location.reload();
        }
    }

    let obstacleInterval = setInterval(moveObstacle, 20);
    let obstacleTimeout = setTimeout(generateobstacle, randomTimeout);


}

generateobstacle();


function control(e){
    if(e.key == 'ArrowUp'  || e.key ==' '){
        Jump();

    }
}
document.addEventListener('keydown',control);
