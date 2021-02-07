const main = () => {
    const getDogs = async () => {
        try {
            const response = await fetch("https://data.cambridgema.gov/resource/sckh-3xyx.json");

            const jsonData = await response.json();

            let i = 0;
            for (let dog of jsonData) {
                try {
                    const body = {
                        name: dog.dog_name,
                        breed: dog.dog_breed,
                        location: `(${dog.location_masked.latitude},${dog.location_masked.longitude})`,
                        neighborhood: dog.neighborhood,
                    };
                    const response = await fetch("http://localhost:5000/dogs", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    });
                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    getDogs();
};

// main();
