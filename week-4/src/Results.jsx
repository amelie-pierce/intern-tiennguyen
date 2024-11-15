import Pet from './Pet'

const Results = ({pets}) => {
    return (
        <div className='search'>
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map(pet => (
                    <Pet
                        {...pet}
                        animal={pet.animal}
                        id={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                        key={pet.id}
                    />
                ))
            )}
        </div>
    )
}

export default Results;

// const testFuntion = (color) => {
//     console.log(color)

// }

// testFunction('red')

// testFuntion()
    // color: function props (arguments/ attributes/ ...)
    // Điểm kết nối các components

    // {pets} gọi trực tiếp biến trong object (detructering) ra
    // return: trả về JSX
// function textFunction(color) {}