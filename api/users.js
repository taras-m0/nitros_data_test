module.exports = function (req, res) {

    setTimeout(function () {

        return res.json(
            [
                {
                    id: '4F0C3B4C-D8D8-4F01-9D9D-03758936EC05',
                    name: 'Иванов',
                    price: 500
                },
                {
                    id: ' A518B7DC-6BB2-4945-AC10-06A296660BDC',
                    name: 'Петров',
                    price: 250
                },
                {
                    id: '7B1D6B3F-F986-4E5A-92FD-0CB361140A23',
                    name: 'Сидоров',
                    price: 1000
                }
            ]
        );
    }, 1000);
}