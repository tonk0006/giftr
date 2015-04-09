//app.js

var tonk0006_giftr = {
    loadRequirements: 0,
    personName: '',
    occasionName: '',
    init: function () {
        document.addEventListener('deviceready', this.onDeviceReady);
        document.addEventListener('DOMContentLoaded', this.onDomReady);
    },
    onDeviceReady: function () {
        //alert("Device is ready");
        tonk0006_giftr.loadRequirements++;
        if (tonk0006_giftr.loadRequirements === 2) {
            tonk0006_giftr.start();
        }
    },
    onDomReady: function () {
        //alert("DOM is ready");
        tonk0006_giftr.loadRequirements++;
        if (tonk0006_giftr.loadRequirements === 2) {
            tonk0006_giftr.start();
        }
    },
    start: function () {
        //connect to database
        //build the lists for the main pages based on data
        //add button and navigation listeners

        tonk0006_giftr.showPeopleList();
        
        var addButtons = document.querySelectorAll('.btnAdd');
        addButtons[0].addEventListener('click', tonk0006_giftr.addPerson);
        addButtons[1].addEventListener('click', tonk0006_giftr.addOccasion);
        addButtons[2].addEventListener('click', tonk0006_giftr.addGiftForPerson);
        addButtons[3].addEventListener('click', tonk0006_giftr.addGiftForOccasion);

        var cancelButtons = document.querySelectorAll('.btnCancel');
        cancelButtons[0].addEventListener('click', tonk0006_giftr.cancelModal);
        cancelButtons[1].addEventListener('click', tonk0006_giftr.cancelModal);
        cancelButtons[2].addEventListener('click', tonk0006_giftr.cancelModal);
        cancelButtons[3].addEventListener('click', tonk0006_giftr.cancelModal);
        
        var saveButtons = document.querySelectorAll('.btnSave');
        saveButtons[0].addEventListener('click', tonk0006_giftr.savePerson);
        saveButtons[1].addEventListener('click', tonk0006_giftr.saveOccasion);
        saveButtons[2].addEventListener('click', tonk0006_giftr.saveGiftForPerson);
        saveButtons[3].addEventListener('click', tonk0006_giftr.saveGiftForOccasion);
        
        document.querySelector('header h1').addEventListener('click', tonk0006_giftr.showPeopleList);
                
        var list = document.querySelectorAll('[data-role="listview"]');
        var hm1 = new Hammer.Manager(list[0]);
        var hm2 = new Hammer.Manager(list[1]);

        var singleTap1 = new Hammer.Tap({
            event: 'singletap'
        });
        
        var doubleTap1 = new Hammer.Tap({
            event: 'doubletap',
            taps: 2,
            threshold: 10,
            posThreshold: 40
        });
        
        var singleTap2 = new Hammer.Tap({
            event: 'singletap'
        });
        
        var doubleTap2 = new Hammer.Tap({
            event: 'doubletap',
            taps: 2,
            threshold: 10,
            posThreshold: 40
        });
        
        hm1.add([doubleTap1, singleTap1]);
        hm2.add([doubleTap2, singleTap2]);
        doubleTap1.recognizeWith(singleTap1);
        doubleTap2.recognizeWith(singleTap2);
        doubleTap1.requireFailure(singleTap1);
        doubleTap2.requireFailure(singleTap2);
        
        hm1.on('singletap', tonk0006_giftr.showGiftsForPerson);
        hm2.on('singletap', tonk0006_giftr.showGiftsForOccasion);
        hm1.on('doubletap', tonk0006_giftr.deleteListItem);
        hm2.on('doubletap', tonk0006_giftr.deleteListItem);
        
        var pages = document.querySelectorAll('[data-role=page]');
        
        var goToPeople = new Hammer(pages[1]);
        goToPeople.on('swiperight', tonk0006_giftr.showPeopleList);
        
        var goToOccassions = new Hammer(pages[0]);
        goToOccassions.on('swipeleft', tonk0006_giftr.showOccasionList);

    },

    showPeopleList: function () {
        var pages = document.querySelectorAll('[data-role=page]');
        pages[0].style.display = 'block';
        pages[1].style.display = 'none';
        pages[2].style.display = 'none';
        pages[3].style.display = 'none';
    },

    showOccasionList: function () {
        var pages = document.querySelectorAll('[data-role=page]');
        pages[0].style.display = 'none';
        pages[1].style.display = 'block';
        pages[2].style.display = 'none';
        pages[3].style.display = 'none';
    },
    
    showGiftsForPerson: function (ev) {
        var pages = document.querySelectorAll('[data-role=page]');
        pages[0].style.display = 'none';
        pages[2].style.display = 'block';
        var name = ev.target.innerHTML;
        console.log('Displayed gift ideas page for ' + name);
        var paras = document.querySelectorAll('.details');
        if (paras[2].innerHTML !== '')
            paras[2].innerHTML = 'Here are all the gift ideas for <strong>' + name + '</strong> for all occasions.';
        personName = name;
    },
    
    showGiftsForOccasion: function (ev) {
        var pages = document.querySelectorAll('[data-role=page]');
        pages[1].style.display = 'none';
        pages[3].style.display = 'block';
        var occasion = ev.target.innerHTML;
        console.log('Displayed gift ideas page for ' + occasion);
        var paras = document.querySelectorAll('.details');
        if (paras[3].innerHTML !== '')
            paras[3].innerHTML = 'Here are all the gift ideas for <strong>' + occasion + '</strong> for all people.';
        occasionName = occasion;
    },

    addPerson: function () {
        console.log('Person modal window opened');
        document.querySelector('[data-role=modal]#add-person').style.display = 'block';
        document.querySelector('[data-role=overlay]').style.display = 'block';
        var input = document.querySelector('#new-per');
        input.value = '';
        input.focus();
        input.addEventListener('keypress', function (ev) {
            ev.stopImmediatePropagation();
            if (ev.keyCode === 13) {
                ev.preventDefault();
                tonk0006_giftr.savePerson();
                input.blur();
            }
        });
    },

    addOccasion: function () {
        console.log('Occasion modal window opened');
        document.querySelector('[data-role=modal]#add-occasion').style.display = 'block';
        document.querySelector('[data-role=overlay]').style.display = 'block';
        var input = document.querySelector('#new-occ');
        input.value = '';
        input.focus();
        input.addEventListener('keypress', function (ev) {
            ev.stopImmediatePropagation();
            if (ev.keyCode === 13) {
                ev.preventDefault();
                tonk0006_giftr.saveOccasion();
                input.blur();
            }
        });
    },
    
    addGiftForPerson: function () {
        console.log('Gift for person modal window opened');
        document.querySelector('[data-role=modal]#add-gift-per').style.display = 'block';
        document.querySelector('[data-role=overlay]').style.display = 'block';
        var nameArray = document.querySelectorAll('li');
        console.log(nameArray);
        var headings = document.querySelectorAll('h3');
        headings[2].innerHTML = 'New gift for <strong>' + personName + '</strong>.';
    },
    
    addGiftForOccasion: function () {
        console.log('Gift for occasion modal window opened');
        document.querySelector('[data-role=modal]#add-gift-occ').style.display = 'block';
        document.querySelector('[data-role=overlay]').style.display = 'block';
        var headings = document.querySelectorAll('h3');
        headings[3].innerHTML = 'New gift for <strong>' + occasionName + '</strong>.';
    },
    
    savePerson: function () {
        var ul = document.querySelectorAll('[data-role="listview"]');
        var li = document.createElement('li');
        var text = document.querySelector('#new-per').value;
        li.innerHTML = text;
//        li.setAttribute('data-ref', text);
        li.setAttribute('id', text);
        if (text)
            ul[0].appendChild(li);
        tonk0006_giftr.cancelModal();
    },
    
    saveOccasion: function () {
        var ul = document.querySelectorAll('[data-role="listview"]');
        var li = document.createElement('li');
        var text = document.querySelector('#new-occ').value;
        li.innerHTML = text;
//        li.setAttribute('data-ref', text);
        li.setAttribute('id', text);
        if(text)
            ul[1].appendChild(li);
        tonk0006_giftr.cancelModal();
    },
    
    saveGiftForPerson: function () {
        
    },
    
    saveGiftForOccasion: function () {
        
    },
    
    deleteListItem: function (ev) {
        console.log('Double-tap event occured');
        var item = ev.target.innerHTML;
        var li = document.getElementById(item);
        li.parentNode.removeChild(li);
        console.log('Item ' + item + ' was deleted from the screen');
    },
    
    cancelModal: function () {
        var modals = document.querySelectorAll('[data-role=modal]');
        modals[0].style.display = 'none';
        modals[1].style.display = 'none';
        modals[2].style.display = 'none';
        modals[3].style.display = 'none';
        document.querySelector('[data-role=overlay]').style.display = 'none';
    }
}

tonk0006_giftr.init();