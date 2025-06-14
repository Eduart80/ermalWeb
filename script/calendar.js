document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing calendar...');
    
    var calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
        console.error('Calendar element not found!');
        return;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        selectable: true,
        selectMirror: true,
        longPressDelay: 100,
        height: 'auto',
        dateClick: function(info) {
            handleDateSelection(info.dateStr);
        },
        select: function(info) {
            handleDateSelection(info.startStr);
        },
        selectConstraint: {
            start: new Date() // Prevents selecting past dates
        }
    });

    calendar.render();
    console.log('Calendar rendered');

    function handleDateSelection(dateStr) {
        var selectedDate = new Date(dateStr);
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate >= today) {
            window.selectedDate = dateStr; // Make it accessible to booking.js
            displayAvailableSlots(dateStr);
        } else {
            alert('Please select a future date');
        }
    }
});

function toggleVisibilityBasedOnChildren(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}