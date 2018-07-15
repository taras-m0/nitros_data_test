export default (dataArr, filters, users) => {

    // Делаем проверки наличия фильтров с целью ускорения работы фильтра
    if(filters.tasks != ''){
        dataArr = dataArr.filter((task) => ( task.name.search(filters.tasks) != -1 ));
    }

    if(filters.users != ''){
        dataArr = dataArr.filter(
            (task) => ( users.filter(( user ) => ( user.name.search(filters.users) != -1 )).some((user) => (user.id == task.user_id)))
        );
    }

    return dataArr;
}