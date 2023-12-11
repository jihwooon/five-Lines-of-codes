describe('ch01', function () {
    var containsEven = function (arr) {
        for (var x = 0; x < arr.length; x++) {
            for (var y = 0; y < arr[x].length; y++) {
                if (arr[x][y] % 2 === 0) {
                    return true;
                }
            }
        }
    };
    return false;
});
