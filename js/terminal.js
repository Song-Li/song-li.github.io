pos = 0;
num = 0;
newline_str = "<br> $ > ";
commands = [
  "name",
  "country",
  "school",
  "job",
  "blog",
  "github",
  "resume"
];

results = [
  "Song Li",
  "China",
  "Lehigh University",
  "Master Student of Computer Science",
  "<a href='http://blog.songli.us/' class='terminal-link'>BLOG</a>",
  '<a href="https://github.com/Song-Li" class="terminal-link">GITHUB</a>',
  '<a href="http://blog.songli.us/profile/" class="terminal-link">RESUME</a>'
]

function type() {
  if (num == commands.length) return ;
  str = commands[num];
  text = str.charAt(pos ++);

  document.getElementById('write-pos').innerHTML += text;
  if (pos === str.length) {
    document.getElementById('write-pos').innerHTML += newline_str;
    document.getElementById('result-pos').innerHTML += results[num] + newline_str;

    num ++;
    pos = 0;
    setTimeout(type, 700);
    return ;
  }
  //setTimeout(type, 80 + Math.random() * (200 - 10) + 10);
  setTimeout(type, 100);
}

function terminal() {
  document.getElementById('write-pos').innerHTML = '$ > ';
  document.getElementById('result-pos').innerHTML = '$ > ';
  type();
}
