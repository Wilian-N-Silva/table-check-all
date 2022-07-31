const tables = document.querySelectorAll('table.table--with-checks');

var checkAllInputs = [];
var tableInputs = [];

function updateChecks(event) {
    let countCheck = 0;
    const eventTarget = event.target;
    const isCheckAllEvent = eventTarget.classList.contains('check-all');

    const tableIndex = eventTarget.getAttribute('data-parent-table');
    const checkAllInput = isCheckAllEvent ? eventTarget : checkAllInputs[tableIndex];
    const checkboxes = tables[tableIndex].querySelectorAll('tbody input[type="checkbox"]');

    if (checkAllInput) {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                countCheck++;
            }
        });

        if (isCheckAllEvent) {
            if (checkboxes.length === countCheck) {
                checkboxes.forEach(checkbox => checkbox.checked = false);
                checkAllInput.indeterminate = false;
                checkAllInput.checked = false;
            } else {
                checkboxes.forEach(checkbox => checkbox.checked = true);
                checkAllInput.indeterminate = false;
                checkAllInput.checked = true;
            }
        } else {
            if (countCheck === 0) {
                checkAllInput.checked = false;
                checkAllInput.indeterminate = false;
            } else if (checkboxes.length === countCheck) {
                checkAllInput.indeterminate = false;
                checkAllInput.checked = true;
            } else {
                checkAllInput.checked = false;
                checkAllInput.indeterminate = true;
            }
        }
    }
}

tables.forEach((table, index) => {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');

    checkboxes.forEach(input => {
        input.setAttribute('data-parent-table', index);
        input.addEventListener('click', updateChecks);
    });

    const tableCheckAll = table.querySelector('input.check-all');

    if (tableCheckAll) {
        checkAllInputs.push(tableCheckAll);
    }
    checkAllInputs.forEach((checkAllInput, index) => {
        checkAllInput.setAttribute('data-parent-table', index);
        checkAllInput.addEventListener('click', updateChecks);
    });
});




