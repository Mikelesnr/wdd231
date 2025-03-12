const courses = [
    { id: 1, name: 'CSE 110', category: 'CSE', completed: true },
    { id: 2, name: 'WDD 130', category: 'WDD', completed: false },
    { id: 3, name: 'CSE 210', category: 'CSE', completed: false },
    { id: 4, name: 'WDD 231', category: 'WDD', completed: false },
    { id: 5, name: 'WDD 131', category: 'WDD', completed: false },
    { id: 6, name: 'CSE 111', category: 'CSE', completed: false }
];

function displayCourses(filteredCategory = 'all') {
    const courseContainer = document.querySelector('.courses');
    courseContainer.innerHTML = '';

    const filteredCourses = courses.filter(course => 
        filteredCategory === 'all' || course.category === filteredCategory
    );

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.textContent = course.name;
        courseCard.classList.add('course-card', course.completed ? 'completed' : 'not-completed');
        courseContainer.appendChild(courseCard);
    });
}

function filterCourses(category) {
    displayCourses(category);
}

document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
});
