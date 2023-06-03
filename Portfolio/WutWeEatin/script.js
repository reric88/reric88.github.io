function shuffle(array){
    var currentIndex = array.length,
    randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[currentIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function spin(){
    wheels.play();
    const box = document.getElementById("box");
    const element = document.getElementById("main-box");
    let SelectedItem = "";

    let cheddars = shuffle([1890, 2250, 2610]);

    let where2 = shuffle([1750, 2110, 2470]);

    let where = shuffle([1770, 2130, 2490]);

    let texas = shuffle([1850, 2210, 2570]);

    let chicfila = shuffle([1810, 2170, 2530]);

    let jimmy = shuffle([1630, 1990, 2350]);

    let hardees = shuffle([1570, 1930, 2290]);

    let results = shuffle([
        cheddars[0],
        chicfila[0],
        where[0],
        // wendys[0],
        where2[0],
        texas[0],
        jimmy[0],
        hardees[0],
    ]);

    if(cheddars.includes(results[0])) SelectedItem = "Cheddars?";
    if(chicfila.includes(results[0])) SelectedItem = "Chic-Fil-A?";
    if(where.includes(results[0])) SelectedItem = "Anywhere is fine.";
    if(where2.includes(results[0])) SelectedItem = "I don't care where we go.";
    if(texas.includes(results[0])) SelectedItem = "Texas Roadhouse?";
    if(jimmy.includes(results[0])) SelectedItem = "Jimmy John's?";
    if(hardees.includes(results[0])) SelectedItem = "Hardee's?";

    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = "rotate(" + results[0] + "deg)";
    element.classList.remove("animate");
    setTimeout(function(){
            element.classList.add("animate");


    }, 5000);

    setTimeout(function(){
        if(where.includes(results[0]))
        {
            aww.play();
            Swal.fire(
                SelectedItem,
                'You choose.'
            )
        } else if(where2.includes(results[0]))
        {
            aww.play();
            Swal.fire(
                SelectedItem,
                'I want you to pick.'
            )
        } else {
        aww.play();
        Swal.fire(
                SelectedItem,
                'I dont really want ' + SelectedItem + '...'
            
        )
    }
    }, 5500)

    setTimeout(function(){
        box.style.setProperty("transition", "initial");
        box.style.transform = "rotate(90deg)";

    }, 6000);

}