/* =========================================================
   DEADLINEBOX
   Complete JavaScript
   ========================================================= */


/* ================= STORAGE ================= */

const STORAGE_KEY = "deadlinebox_deadlines";
const THEME_KEY = "deadlinebox_theme";


/* ================= STATE ================= */

let deadlines = [];

let editingDeadlineId = null;

let toastTimer = null;


/* ================= DOM ================= */

const addDeadlineBtn =
    document.getElementById("addDeadlineBtn");

const themeToggle =
    document.getElementById("themeToggle");

const modal =
    document.getElementById("deadlineModal");

const modalTitle =
    document.getElementById("modalTitle");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const form =
    document.getElementById("deadlineForm");

const subjectInput =
    document.getElementById("subject");

const taskInput =
    document.getElementById("task");

const dateInput =
    document.getElementById("date");

const timeInput =
    document.getElementById("time");

const importanceInput =
    document.getElementById("importance");

const activeContainer =
    document.getElementById("activeDeadlines");

const completedContainer =
    document.getElementById("completedDeadlines");

const todayCount =
    document.getElementById("todayCount");

const soonCount =
    document.getElementById("soonCount");

const upcomingCount =
    document.getElementById("upcomingCount");

const completedCount =
    document.getElementById("completedCount");

const toast =
    document.getElementById("deadlinebox-toast");


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function loadDeadlines() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        deadlines =
            saved
                ? JSON.parse(saved)
                : [];

        if (!Array.isArray(deadlines)) {
            deadlines = [];
        }

    } catch (error) {

        console.error(error);

        deadlines = [];
    }
}


function saveDeadlines() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(deadlines)
    );
}


/* =========================================================
   THEME
   ========================================================= */

function loadTheme() {

    const theme =
        localStorage.getItem(THEME_KEY);

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        updateThemeButton(true);

    } else {

        updateThemeButton(false);
    }
}


function updateThemeButton(isDark) {

    if (!themeToggle) return;

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";

    themeToggle.title =
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode";
}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );

    localStorage.setItem(
        THEME_KEY,
        isDark
            ? "dark"
            : "light"
    );

    updateThemeButton(isDark);
}


/* =========================================================
   MODAL
   ========================================================= */

function openAddModal() {

    editingDeadlineId = null;

    modalTitle.textContent =
        "Add Deadline";

    form.reset();

    setMinimumDate();

    modal.classList.add("active");

    setTimeout(() => {

        subjectInput.focus();

    }, 100);
}


function openEditModal(id) {

    const deadline =
        deadlines.find(
            item => item.id === id
        );

    if (!deadline) return;

    editingDeadlineId = id;

    modalTitle.textContent =
        "Edit Deadline";

    subjectInput.value =
        deadline.subject;

    taskInput.value =
        deadline.task;

    dateInput.value =
        deadline.date;

    timeInput.value =
        deadline.time;

    importanceInput.value =
        deadline.importance;

    modal.classList.add("active");
}


function closeModal() {

    modal.classList.remove("active");

    editingDeadlineId = null;

    form.reset();

    setMinimumDate();
}


function setMinimumDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;
}


/* =========================================================
   ADD / EDIT
   ========================================================= */

function handleSubmit(event) {

    event.preventDefault();

    const subject =
        subjectInput.value.trim();

    const task =
        taskInput.value.trim();

    const date =
        dateInput.value;

    const time =
        timeInput.value;

    const importance =
        importanceInput.value;


    if (
        !subject ||
        !task ||
        !date ||
        !time ||
        !importance
    ) {

        showToast(
            "Please fill in all fields."
        );

        return;
    }


    const deadlineTime =
        new Date(
            `${date}T${time}`
        ).getTime();


    if (
        Number.isNaN(deadlineTime)
    ) {

        showToast(
            "Please enter a valid date and time."
        );

        return;
    }


    /*
       New deadline must be in future.
    */

    if (
        !editingDeadlineId &&
        deadlineTime <= Date.now()
    ) {

        showToast(
            "Please choose a future deadline."
        );

        return;
    }


    if (editingDeadlineId) {

        updateDeadline(
            editingDeadlineId,
            subject,
            task,
            date,
            time,
            importance
        );

    } else {

        createDeadline(
            subject,
            task,
            date,
            time,
            importance
        );
    }


    saveDeadlines();

    closeModal();

    renderApp();
}


function createDeadline(
    subject,
    task,
    date,
    time,
    importance
) {

    deadlines.push({

        id: generateId(),

        subject,

        task,

        date,

        time,

        importance,

        completed: false,

        popupShown: false,

        createdAt: Date.now(),

        completedAt: null
    });


    showToast(
        "Deadline added successfully."
    );
}


function updateDeadline(
    id,
    subject,
    task,
    date,
    time,
    importance
) {

    const deadline =
        deadlines.find(
            item => item.id === id
        );

    if (!deadline) return;


    deadline.subject =
        subject;

    deadline.task =
        task;

    deadline.date =
        date;

    deadline.time =
        time;

    deadline.importance =
        importance;


    /*
       Reset popup if edited
       into a future deadline.
    */

    if (
        getTimeRemaining(deadline) > 0
    ) {

        deadline.popupShown =
            false;
    }


    showToast(
        "Deadline updated successfully."
    );
}


/* =========================================================
   COMPLETE
   ========================================================= */

function completeDeadline(id) {

    const deadline =
        deadlines.find(
            item => item.id === id
        );

    if (!deadline) return;


    deadline.completed =
        true;

    deadline.completedAt =
        Date.now();


    saveDeadlines();

    renderApp();


    showToast(
        "Deadline marked as completed."
    );
}


/* =========================================================
   DELETE ACTIVE
   ========================================================= */

function deleteDeadline(id) {

    const deadline =
        deadlines.find(
            item => item.id === id
        );

    if (!deadline) return;


    const confirmed =
        confirm(
            `Delete "${deadline.task}"?`
        );


    if (!confirmed) return;


    deadlines =
        deadlines.filter(
            item => item.id !== id
        );


    saveDeadlines();

    renderApp();


    showToast(
        "Deadline deleted."
    );
}


/* =========================================================
   DELETE COMPLETED
   ========================================================= */

function deleteCompletedDeadline(id) {

    const deadline =
        deadlines.find(
            item => item.id === id
        );

    if (!deadline) return;


    const confirmed =
        confirm(
            `Delete "${deadline.task}" from completed deadlines?`
        );


    if (!confirmed) return;


    deadlines =
        deadlines.filter(
            item => item.id !== id
        );


    saveDeadlines();

    renderApp();


    showToast(
        "Completed deadline deleted."
    );
}


/* =========================================================
   ID
   ========================================================= */

function generateId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}


/* =========================================================
   DATE / TIME
   ========================================================= */

function getDeadlineTimestamp(deadline) {

    return new Date(
        `${deadline.date}T${deadline.time}`
    ).getTime();
}


function getTimeRemaining(deadline) {

    return (
        getDeadlineTimestamp(deadline) -
        Date.now()
    );
}


function isOverdue(deadline) {

    return (
        !deadline.completed &&
        getTimeRemaining(deadline) <= 0
    );
}


/* =========================================================
   PRIORITY
   ========================================================= */

function calculatePriority(deadline) {

    if (deadline.completed) {

        return "completed";
    }


    const remaining =
        getTimeRemaining(deadline);


    if (remaining <= 0) {

        return "urgent";
    }


    const hours =
        remaining /
        (1000 * 60 * 60);


    if (hours <= 24) {

        return "urgent";
    }


    if (hours <= 72) {

        return "soon";
    }


    return "upcoming";
}


function importanceScore(value) {

    if (value === "high") {
        return 3;
    }

    if (value === "medium") {
        return 2;
    }

    return 1;
}


/* =========================================================
   SORT
   ========================================================= */

function sortDeadlines(list) {

    return [...list].sort(
        (a, b) => {

            const aOverdue =
                isOverdue(a);

            const bOverdue =
                isOverdue(b);


            /*
               Overdue first.
            */

            if (
                aOverdue &&
                !bOverdue
            ) {
                return -1;
            }

            if (
                !aOverdue &&
                bOverdue
            ) {
                return 1;
            }


            /*
               Earlier deadlines first.
            */

            const timeDifference =
                getDeadlineTimestamp(a) -
                getDeadlineTimestamp(b);


            if (
                timeDifference !== 0
            ) {

                return timeDifference;
            }


            /*
               Higher importance first
               if deadline times are equal.
            */

            return (
                importanceScore(
                    b.importance
                ) -
                importanceScore(
                    a.importance
                )
            );
        }
    );
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function formatCountdown(milliseconds) {

    if (milliseconds <= 0) {

        return "🚨 OVERDUE";
    }


    let totalSeconds =
        Math.floor(
            milliseconds / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    totalSeconds %= 86400;


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    totalSeconds %= 3600;


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    const h =
        String(hours)
            .padStart(2, "0");

    const m =
        String(minutes)
            .padStart(2, "0");

    const s =
        String(seconds)
            .padStart(2, "0");


    if (days > 0) {

        return (
            `${days}d ${h}h ${m}m ${s}s`
        );
    }


    return (
        `${h}h ${m}m ${s}s`
    );
}


/* =========================================================
   DATE DISPLAY
   ========================================================= */

function formatDate(deadline) {

    const date =
        new Date(
            `${deadline.date}T${deadline.time}`
        );


    return date.toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function formatTime(deadline) {

    const date =
        new Date(
            `${deadline.date}T${deadline.time}`
        );


    return date.toLocaleTimeString(
        undefined,
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        String(value ?? "");

    return element.innerHTML;
}


/* =========================================================
   PRIORITY LABEL
   ========================================================= */

function priorityLabel(priority) {

    if (priority === "urgent") {
        return "🔴 URGENT";
    }

    if (priority === "soon") {
        return "🟠 SOON";
    }

    return "🟢 UPCOMING";
}


/* =========================================================
   ACTIVE DEADLINES
   ========================================================= */

function renderActiveDeadlines() {

    const active =
        deadlines.filter(
            deadline =>
                !deadline.completed
        );


    if (active.length === 0) {

        activeContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📭
                </div>

                <h3>
                    No deadlines yet
                </h3>

                <p>
                    Add your first deadline
                    and stay organized.
                </p>

                <button
                    class="primary-btn"
                    type="button"
                    onclick="openAddModal()"
                >
                    ＋ Add Deadline
                </button>

            </div>
        `;

        return;
    }


    const sorted =
        sortDeadlines(active);


    activeContainer.innerHTML =
        sorted
            .map(
                createDeadlineCard
            )
            .join("");
}


/* =========================================================
   ACTIVE CARD
   ========================================================= */

function createDeadlineCard(deadline) {

    const priority =
        calculatePriority(deadline);


    return `

        <article
            class="deadline-card ${priority}"
        >

            <div class="deadline-card-top">

                <span class="priority-badge">

                    ${priorityLabel(
                        priority
                    )}

                </span>


                <span class="importance-badge">

                    ${escapeHTML(
                        deadline.importance
                            .toUpperCase()
                    )}

                </span>

            </div>


            <div class="deadline-content">

                <h3>
                    ${escapeHTML(
                        deadline.subject
                    )}
                </h3>


                <p class="deadline-task">

                    ${escapeHTML(
                        deadline.task
                    )}

                </p>


                <p class="deadline-date">

                    Due:
                    ${formatDate(deadline)}
                    •
                    ${formatTime(deadline)}

                </p>


                <div
                    class="countdown"
                    data-countdown-id="${deadline.id}"
                >

                    ${formatCountdown(
                        getTimeRemaining(deadline)
                    )}

                </div>


                <div class="deadline-actions">

                    <button
                        type="button"
                        class="complete-btn"
                        onclick="completeDeadline('${deadline.id}')"
                    >
                        ✓ Complete
                    </button>


                    <button
                        type="button"
                        class="edit-btn"
                        onclick="openEditModal('${deadline.id}')"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteDeadline('${deadline.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   COMPLETED DEADLINES
   ========================================================= */

function renderCompletedDeadlines() {

    const completed =
        deadlines
            .filter(
                deadline =>
                    deadline.completed
            )
            .sort(
                (a, b) =>
                    (
                        b.completedAt || 0
                    ) -
                    (
                        a.completedAt || 0
                    )
            );


    if (completed.length === 0) {

        completedContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ✅
                </div>

                <h3>
                    No completed deadlines yet
                </h3>

                <p>
                    Completed tasks will
                    appear here.
                </p>

            </div>
        `;

        return;
    }


    completedContainer.innerHTML =
        completed
            .map(
                createCompletedCard
            )
            .join("");
}


function createCompletedCard(deadline) {

    return `

        <article class="completed-card">

            <div class="completed-left">

                <div class="completed-icon">
                    ✓
                </div>


                <div class="completed-info">

                    <h3>
                        ${escapeHTML(
                            deadline.subject
                        )}
                    </h3>


                    <p>
                        ${escapeHTML(
                            deadline.task
                        )}
                    </p>


                    <small>
                        Completed
                    </small>

                </div>

            </div>


            <div class="completed-actions">

                <button
                    type="button"
                    class="delete-btn"
                    onclick="deleteCompletedDeadline('${deadline.id}')"
                >
                    Delete
                </button>

            </div>

        </article>
    `;
}


/* =========================================================
   STATISTICS
   ========================================================= */

function updateStatistics() {

    const active =
        deadlines.filter(
            deadline =>
                !deadline.completed
        );


    const completed =
        deadlines.filter(
            deadline =>
                deadline.completed
        );


    let today = 0;

    let soon = 0;

    let upcoming = 0;


    active.forEach(
        deadline => {

            const remaining =
                getTimeRemaining(deadline);


            if (remaining <= 0) {
                return;
            }


            if (isToday(deadline)) {

                today++;

                return;
            }


            const priority =
                calculatePriority(deadline);


            if (priority === "soon") {

                soon++;

            } else {

                upcoming++;
            }
        }
    );


    todayCount.textContent =
        today;

    soonCount.textContent =
        soon;

    upcomingCount.textContent =
        upcoming;

    completedCount.textContent =
        completed.length;
}


/* =========================================================
   TODAY
   ========================================================= */

function isToday(deadline) {

    const deadlineDate =
        new Date(
            `${deadline.date}T${deadline.time}`
        );

    const now =
        new Date();


    return (
        deadlineDate.getFullYear() ===
            now.getFullYear()

        &&

        deadlineDate.getMonth() ===
            now.getMonth()

        &&

        deadlineDate.getDate() ===
            now.getDate()
    );
}


/* =========================================================
   IN-APP POPUP
   ========================================================= */

function showDeadlinePopup(deadline) {

    /*
       Only one popup at a time.
    */

    if (
        document.getElementById(
            "deadlinePopup"
        )
    ) {

        return;
    }


    const popup =
        document.createElement("div");


    popup.id =
        "deadlinePopup";


    popup.className =
        "deadline-popup";


    popup.innerHTML = `

        <div class="deadline-popup-icon">
            ⏰
        </div>


        <div class="deadline-popup-content">

            <strong>
                DEADLINE REACHED
            </strong>


            <h3>
                ${escapeHTML(
                    deadline.subject
                )}
            </h3>


            <p>
                ${escapeHTML(
                    deadline.task
                )}
                is due now.
            </p>

        </div>


        <button
            class="deadline-popup-close"
            type="button"
            aria-label="Close"
        >
            ×
        </button>
    `;


    document.body.appendChild(
        popup
    );


    requestAnimationFrame(
        () => {

            popup.classList.add(
                "show"
            );
        }
    );


    const close =
        popup.querySelector(
            ".deadline-popup-close"
        );


    close.addEventListener(
        "click",
        () => {

            popup.classList.remove(
                "show"
            );

            setTimeout(
                () => popup.remove(),
                300
            );
        }
    );


    /*
       Automatically close after 8 seconds.
    */

    setTimeout(
        () => {

            if (
                popup.parentNode
            ) {

                popup.classList.remove(
                    "show"
                );

                setTimeout(
                    () => {

                        if (
                            popup.parentNode
                        ) {

                            popup.remove();
                        }

                    },
                    300
                );
            }

        },
        8000
    );
}


/* =========================================================
   CHECK DEADLINES
   ========================================================= */

function checkDeadlinePopups() {

    let changed = false;


    deadlines.forEach(
        deadline => {

            if (
                deadline.completed
            ) {
                return;
            }


            if (
                deadline.popupShown
            ) {
                return;
            }


            if (
                getTimeRemaining(deadline) <= 0
            ) {

                showDeadlinePopup(
                    deadline
                );


                deadline.popupShown =
                    true;


                changed = true;
            }
        }
    );


    if (changed) {

        saveDeadlines();
    }
}


/* =========================================================
   UPDATE COUNTDOWNS
   ========================================================= */

function updateCountdowns() {

    checkDeadlinePopups();


    const countdowns =
        document.querySelectorAll(
            "[data-countdown-id]"
        );


    countdowns.forEach(
        element => {

            const id =
                element.dataset
                    .countdownId;


            const deadline =
                deadlines.find(
                    item =>
                        item.id === id
                );


            if (
                !deadline ||
                deadline.completed
            ) {
                return;
            }


            const remaining =
                getTimeRemaining(
                    deadline
                );


            element.textContent =
                formatCountdown(
                    remaining
                );


            const card =
                element.closest(
                    ".deadline-card"
                );


            if (!card) return;


            const priority =
                calculatePriority(
                    deadline
                );


            card.classList.remove(
                "urgent",
                "soon",
                "upcoming"
            );


            card.classList.add(
                priority
            );


            const badge =
                card.querySelector(
                    ".priority-badge"
                );


            if (badge) {

                badge.textContent =
                    priorityLabel(
                        priority
                    );
            }
        }
    );


    updateStatistics();
}


/* =========================================================
   RENDER
   ========================================================= */

function renderApp() {

    renderActiveDeadlines();

    renderCompletedDeadlines();

    updateStatistics();

    updateCountdowns();
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

addDeadlineBtn.addEventListener(
    "click",
    openAddModal
);


closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelBtn.addEventListener(
    "click",
    closeModal
);


form.addEventListener(
    "submit",
    handleSubmit
);


themeToggle.addEventListener(
    "click",
    toggleTheme
);


/*
   Click outside modal.
*/

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();
        }
    }
);


/*
   Escape closes modal.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains(
                "active"
            )
        ) {

            closeModal();
        }
    }
);


/*
   When user comes back to the tab,
   refresh everything.
*/

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) {

            renderApp();
        }
    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeApp() {

    loadDeadlines();

    loadTheme();

    setMinimumDate();

    renderApp();


    /*
       Countdown + overdue checking
       every second.
    */

    setInterval(
        updateCountdowns,
        1000
    );
}


initializeApp();