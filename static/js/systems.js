$(function() {
    clearCards();
    $.get('/get_systems', function(systems) {
        $(".header").stop(true, true).delay(100).animate({ height: '20%', padding: '5em' }, 500, function() {        
            renderSystemCards(systems);
        });
    });
});

// Rendering functions
function clearCards() {
    $('.system-cards-container').empty();
}

function renderSystemCards(systems) {
    for (var i in systems) {
        // Get data
        var system = systems[i];
        var sys_name = system['name'];
        var sys_status = system['status'];
        var sys_id = 'system-' + i;

        // Construct html
        var status_html = '<span>' + sys_status + '</span>';
        var title_html = sys_name + ' ' + status_html;

        var boot_btn = '<button class="system-card-action" onclick="bootSystem(\'' + sys_id + '\')">Boot</button>';
        // var shut_btn = '<button class="system-card-action" onclick="shutSystem(\'' + sys_id + '\')">Shutdown</button>';

        // Construct elements
        var card = $('<div class="system-card fade-in-up"></div>');
        var card_title = $('<p class="system-card-title">' + title_html + '</p>');
        var card_btns = $('<div class="system-card-actions"></div>');

        // Append elements & render
        card_btns.append(boot_btn);
        // card_btns.append(shut_btn);

        card.append(card_title);
        card.append(card_btns);

        $('.system-cards-container').append(card);
    }
}

// UI Controlled functions
function bootSystem(system_id) {
    $.get('/boot_system?system_id=' + system_id, function() {
        alert('Booting ' + system_id);
    });
}

function shutSystem(system_id) {
    $.get('/boot_system?system_id=' + system_id, function() {
        alert('Booting ' + system_id);
    });
}