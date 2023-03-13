const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


const player1 = {
    player: 1,
    name: 'SubZero',
    hp: 100,
    img: 'https://66.media.tumblr.com/tumblr_madog64LN71rfjowdo1_1280.gif',
    weapon: ['ice', 'sword'],
    renderHP,
    changeHP,
    elHP,
};

const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'https://i.gifer.com/origin/db/db773ee4aa154ea4f2cab588cff0ef9f_w200.gif',
    weapon: ['fire', 'sword'],
    renderHP,
    changeHP,
    elHP,
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = [
    'head',
    'body',
    'foot'
];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал бубенцы, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}

const createPlayer = (playerObj) => {
    const $player = createElement('div', 'player' + playerObj.player),
          $progressbar = createElement('div', 'progressbar'),
          $character = createElement('div', 'character'),
          $life = createElement('div', 'life'),
          $name = createElement('div', 'name'),
          $img = createElement('img');

    
    $player.append($progressbar);
    $player.append($character);
    $progressbar.append($life);
    $progressbar.append($name);
    $character.append($img);

    $player.classList.add('player' + playerObj.player);
    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    return $player
};

const createRandomNumber = (num) => {
    return Math.ceil(Math.random() * num);
}

function elHP () {
    return document.querySelector('.player' + this.player + ' .life');
  }

  function renderHP () {
    this.elHP().style.width = this.hp + '%';
  }

const playerWins = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if(name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'Draw';
        $chat.innerText = logs.draw;
    }
    return $winTitle;  
}

const setLogsTime = () => {
    const newDate = new Date();
    const date = newDate.getHours() + ':' + newDate.getMinutes();
    $chat.innerText = logs.start
    .replace('[time]', date)
    .replace('[player1]', player1.name)
    .replace('[player2]', player2.name)
}

setLogsTime()

 const createReloadButton = () => {
    const $reloadButton = createElement('button', 'button');
    const $reloadWrap = createElement('div', 'reloadWrap');

    $reloadButton.innerText='Restart';
    $reloadWrap.append($reloadButton);
    $arenas.append($reloadWrap);

    $reloadButton.addEventListener('click', () => {
        window.location.reload();
    }) 
}

const generateLogs = (type, player1, player2) => {
    const text = logs[type][createRandomNumber(type.length) -1]
    .replace('[playerKick]', player1.name)
    .replace('[playerDefence]', player2.name);
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin', el);
}

function enemyAttack() {
   const hit = ATTACK[createRandomNumber(3) - 1]
   const defence = ATTACK[createRandomNumber(3) - 1]

   return {
    value: HIT[hit],
    hit: hit,
    defence: defence
   }
}

const createEndLog = (winPlayer, losePlayer, firstPlayer, secondPlayer) => {
    $chat.innerText = logs.end[createRandomNumber(logs.end.length)]
        .replace(winPlayer, secondPlayer.name)
        .replace(losePlayer, firstPlayer.name);
}

function changeHP (hpToChange) {
    this.hp -= hpToChange;

    if(this.hp <= 0) {
        this.hp = 0;
    }

    this.renderHP();
  }

  const playerAttack = () => {
    const enemy = enemyAttack();
    const attack = {}; 

    for(let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = createRandomNumber(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    if(enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        generateLogs('hit', player2, player1)
    } else{
        generateLogs('defence', player1, player2)
    }
    
    if(attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        generateLogs('hit', player1, player2)
    } else {
        generateLogs('defence', player2, player1)
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
 
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        createReloadButton()
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.append(playerWins(player2.name));
        createEndLog('[playerWins]', '[playerLose]', player1, player2)
      
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.append(playerWins(player1.name));
        createEndLog('[playerWins]', '[playerLose]', player2, player1)
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.append(playerWins());
        createReloadButton()
    } 

    playerAttack()
});

$arenas.append( createPlayer(player1) );
$arenas.append( createPlayer(player2) );
