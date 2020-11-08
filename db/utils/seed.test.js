const { formatBelongsTo } = require('./data-manipulation');

describe('formatBelongsTo', () => {
    it('does not mutate data', () => {
        const restaurantInput = [{
            name: "Edo's Sushi",
            cuisine: "Japanese",
            city_name: "Sheffield",
            logo:
              "https://www.edosushi.co.uk/wp-content/uploads/2019/09/edo-sushi-logo-final_blue-01-1.png",
          }];
        const cityInput = [{ name: "Sheffield" },
        { name: "Derby" },
        { name: "Winchester" }];
        const output = formatBelongsTo(restaurantInput, cityInput, 'city_id', 'city_name', 'name');
        expect(restaurantInput).toEqual([{
            name: "Edo's Sushi",
            cuisine: "Japanese",
            city_name: "Sheffield",
            logo:
              "https://www.edosushi.co.uk/wp-content/uploads/2019/09/edo-sushi-logo-final_blue-01-1.png",
          }]);
    });
    it('returns correct result', () => {
        const restaurantInput = [{
            name: "Edo's Sushi",
            cuisine: "Japanese",
            city_name: "Sheffield",
            logo:
              "https://www.edosushi.co.uk/wp-content/uploads/2019/09/edo-sushi-logo-final_blue-01-1.png",
          }];
        const cityInput = [{ city_id: 1234, name: "Sheffield" },
        { city_id: 12345, name: "Derby" },
        { city_id: 123456, name: "Winchester" }];
        const output = formatBelongsTo(restaurantInput, cityInput, 'city_id', 'city_name', 'name');
        expect(output).toEqual([{
            name: "Edo's Sushi",
            cuisine: "Japanese",
            city_id: 1234,
            logo:
              "https://www.edosushi.co.uk/wp-content/uploads/2019/09/edo-sushi-logo-final_blue-01-1.png",
          }])
    })
})