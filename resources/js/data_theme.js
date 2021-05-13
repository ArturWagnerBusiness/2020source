const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

function setTheme(theme){
    $("#social-media>.github>.icon>img").attr(
        "src",
        "./2020source/resources/assets/social_media/github_"+theme+".png"
    )
}
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        setTheme("light")
    }else{
        setTheme("dark")
    }
} else {
    setTheme("dark")
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setTheme("light")
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setTheme("dark")
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);