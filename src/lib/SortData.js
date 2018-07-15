export default ( dataArr , type, direction, users) => {

    if( direction == 0){
        return dataArr;
    }

    return  [ ...dataArr ].map( (task) => {

        // каждому элементу добавляем параметр меры веса
        switch (type){
            case 'name':
                task.sortWeight = task.name;
                break;

            case 'user':
                task.sortWeight = users.some( (user) => (user.id == task.user_id) ) ? // проверяем есть ли такой user
                    users.find( (user) => (user.id == task.user_id) ).name : '';
                break;

            case 'time':
                task.sortWeight = task.time;
                break;

            case 'price':
                task.sortWeight = users.some( (user) => (user.id == task.user_id) ) ? // проверяем есть ли такой user
                    users.find( (user) => (user.id == task.user_id) ).price * task.time : '';
                break;

            default:
                task.sortWeight = 0;
        }

        return task;
    })
        // сортируем
        .sort(( a, b ) => ( direction * ( a.sortWeight > b.sortWeight ? 1 : (a.sortWeight < b.sortWeight ? -1 : 0))))
        .map( (task) => {
            // удаляем параметр меры веса
            task.sortWeight = undefined;
            return task;
        });
}