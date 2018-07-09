module.exports = function (req, res) {

    setTimeout(function () {
        return res.json(
            [
                {
                    id: "CAACE586-37BC-454E-8FAF-0FEC73C69969",
                    name: "Разработка сервера",
                    user_id: "7B1D6B3F-F986-4E5A-92FD-0CB361140A23",
                    time: 42
                }, {
                id: "A08E2244-E864-4304-BEDF-124D7A447135",
                name: "Разработка интерфейса",
                user_id: "4F0C3B4C-D8D8-4F01-9D9D-03758936EC05",
                time: 56
            }, {
                id: "143B5AB2-C63F-4D56-880C-126BC5DFAE4A",
                name: "написание инструкции",
                user_id: "A518B7DC-6BB2-4945-AC10-06A296660BDC",
                time: 2.5
            }
            ]
        );
    }, 2000);
}


