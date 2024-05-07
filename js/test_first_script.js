document.addEventListener('DOMContentLoaded', function() {
  const formTest = document.querySelector('.form__test');
  const testItems = formTest.querySelectorAll('.form__test-item');
  const resultContent = document.querySelector('.result__content');
  const resultContentList = resultContent.querySelector('.result__content-list');
  let currentIndex = 0; // Индекс текущего элемента
  let answerCount = 0; // Количество ответов

  // Показать только активный элемент
  function showActiveItem() {
    // Добавляем класс 'active' к текущему элементу формы
    testItems.forEach(function(item, index) {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Добавляем класс 'active' к текущему элементу навигации
    const navigationItems = document.querySelectorAll('.naviganiom__question-item');
    navigationItems.forEach(function(item, index) {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Начальное отображение первого элемента
  showActiveItem();

// Обработчик клика по кнопке для переключения на следующий вопрос
const nextQuestionButton = formTest.querySelectorAll('.form__test-button');
nextQuestionButton.forEach(function(button, index) {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    // Проверяем, есть ли хотя бы один выбранный вариант ответа
    const radioInputs = testItems[currentIndex].querySelectorAll('input[type="radio"]');
    const isChecked = Array.from(radioInputs).some(input => input.checked);

    if (!isChecked) {
      // Если ни один вариант ответа не выбран, выходим из функции
      return;
    }

    // Удаляем класс 'active' у текущего элемента
    testItems[currentIndex].classList.remove('active');

    // Увеличиваем индекс текущего элемента на 1
    currentIndex++;

    // Проверяем, не вышли ли мы за пределы массива
    if (currentIndex >= testItems.length) {
      currentIndex = 0; // Возвращаемся к первому элементу
    }

    // Добавляем класс 'active' к новому текущему элементу
    showActiveItem();
  });
});

  // Обработчик клика по кнопке для ответа и показа результатов
  const answerResultButton = testItems[14].querySelector('.form__test-button');
  answerResultButton.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки

    answerCount++; // Увеличиваем количество ответов

    // Показываем результаты после ответа на последний вопрос
    if (answerCount === 1) {
      showResults();
    }
  });

  // Функция для добавления элемента с результатом в result__content
  function addResultItem(questionsAndAnswers) {
    // Получаем текущий список результатов
    const resultList = resultContentList;

    // Проходимся по массиву данных и создаем элементы <li> для каждого вопроса и ответов
    questionsAndAnswers.forEach(function(item) {
      // Создаем элемент <li> для вопроса и ответов
      const resultItem = document.createElement('li');
      resultItem.classList.add('result__item');

      // Создаем элемент <div> для текста вопроса
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('result__question-text');
      questionDiv.textContent = item.question;

      // Добавляем текст вопроса в элемент <li>
      resultItem.appendChild(questionDiv);

      // Создаем элементы <div> для текста ответов
      item.answers.forEach(function(answer) {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('result__content-answer');
        answerDiv.textContent = answer.text;

        // Правильный ответ всегда имеет состояние true и зеленый цвет
        if (answer.isCorrect) {
          answerDiv.classList.add('true');
        }

        // Если был выбран ответ false, то меняем его цвет на красный
        if (!answer.isCorrect && answer.isChecked) {
          answerDiv.classList.add('false');
        }

        // Добавляем текст ответа в элемент <li>
        resultItem.appendChild(answerDiv);
      });

      // Добавляем элемент <li> в текущий список результатов
      resultList.appendChild(resultItem);
    });
  }

  // Функция для показа результатов
  function showResults() {
    // Очищаем содержимое resultContentList перед добавлением новых результатов
    resultContentList.innerHTML = '';

    // Получаем все элементы вопросов с ответами
    const testItems = formTest.querySelectorAll('.form__test-item');

    // Проходимся по каждому элементу вопроса с ответами
    testItems.forEach(function(testItem) {
      // Получаем заголовок вопроса
      const question = testItem.querySelector('.form__test-title').textContent;

      // Получаем все радиокнопки в текущем вопросе
      const radioInputs = testItem.querySelectorAll('input[type="radio"]');

      // Создаем массив для хранения ответов на текущий вопрос
      const answers = [];

      // Проходимся по каждой радиокнопке и добавляем информацию о каждом ответе
      radioInputs.forEach(function(input) {
        const isCorrect = input.dataset.boolean === 'true';
        const isChecked = input.checked;
        const label = input.nextElementSibling.textContent.trim();
        answers.push({ text: label, isCorrect, isChecked });
      });

      // Вызываем функцию addResultItem для текущего вопроса и ответов
      addResultItem([{ question, answers }]);
    });

    // Показываем блок с результатами и скрываем форму
    formTest.style.display = 'none';
    resultContent.style.display = 'flex';
  }
});
