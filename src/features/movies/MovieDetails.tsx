import React, { useEffect } from 'react'
import { MovieType, DetailsResult } from '../../api/movieApi'
import { MoviesList } from './MoviesList'
import { Image } from '../../app/Image'
import { Title, Text, device } from '../../app/lib'
import { useLocation } from 'react-router-dom'
import remove from './../../style/minus.svg'
import vote from './../../style/star.svg'
import add from './../../style/correct.svg'
import styled from 'styled-components'

interface PropsType {
  data: DetailsResult
  onFavorite: (id: string) => void
  similarMovie: MovieType[]
  isFavorite: boolean
  favoriteList: string[]
  statusSimilar: string
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 5;
  width: 70%;
  height: 100%;
  margin: 100px auto;
  box-sizing: border-box;
  padding: 50px;
  color: #fff;
  background: #0b0b0b;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  @media ${device.laptopL} {
    width: 80%;
  }
  @media ${device.laptopS} {
    justify-content: center;
  }
  @media ${device.mobileL} {
    width: 100%;
    margin: 0 auto;
  }
`

const ContainerImage = styled.div`
  margin-right: 75px;
  width: 30%;
  @media ${device.laptopM} {
    margin-right: 45px;
    width: 250px;
    img {
      width: 250px;
    }
  }
  @media ${device.laptopS} {
    width: 350px;
    margin: 0 auto;
    margin-bottom: 25px;
  }
  @media ${device.mobileL} {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 25px;
  }
`
const ContainerDesc = styled.div`
  width: 55%;
  margin-bottom: 50px;
  @media ${device.laptopM} {
    width: 100%;
  }
`
const ContainerInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const Heading = styled(ContainerInfo)`
  justify-content: space-between;
  align-items: center;
`

const Desc = styled(ContainerInfo)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Vote = styled.span`
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
    margin-left: 5px;

`

const Tagline = styled.h2`
  font-size: 16px;
  color: rgb(146, 146, 146);
  font-weight: 600;
  flex-basis: 20%;
`

const TextDesc = styled(Text)`
  flex-basis: 80%;
  margin-bottom: 10px;
`

const Button = styled.button`
  position: relative;
  display: flex;
  color: #fff;
  font-size: 17px;
  background: #202020;
  padding: 10px 30px;
  margin-top: 20px;
  border-radius: 4px;
  outline: none;
  img {
    width: 16px;
    margin-right: 10px;
  }
`

export const MovieDetails = ({
  data,
  onFavorite,
  similarMovie,
  statusSimilar,
  favoriteList,
  isFavorite,
}: PropsType): JSX.Element => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.key])

  const {
    title,
    vote_average,
    poster_path,
    overview,
    tagline,
    release_date,
    first_air_date,
    genres = [],
    runtime,
    episode_run_time,
    name,
    id,
    production_countries = [],
    budget = 0,
  } = data.movieDetails

  const genresList = genres.length
    ? genres.map((movie) => ` ${movie.name.toLowerCase()}`).join()
    : null
  const countries = production_countries.length
    ? production_countries.map((e) => ` ${e.name}`).join()
    : null
  const castList = data.cast
    ? data.cast
        .slice(0, 10)
        .map((item) => ` ${item.name}`)
        .join()
    : null
  const formatBudget = `$ ${budget
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

  return (
    <Container>
      <ContainerImage>
        <Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      </ContainerImage>
      <ContainerDesc>
        <Heading>
          <h2> {title || name} </h2>
          <Vote>
            {`${vote_average} `}
            <img src={vote} alt='vote' />
          </Vote>
        </Heading>

        {release_date || first_air_date ? (
          <Desc>
            <Tagline>Year</Tagline>
            <TextDesc>
              {(release_date || first_air_date).split('-')[0]}
            </TextDesc>
          </Desc>
        ) : null}

        {countries ? (
          <Desc>
            <Tagline>Country</Tagline>
            <TextDesc>{countries}</TextDesc>
          </Desc>
        ) : null}

        <Desc>
          <Tagline>Genres</Tagline>
          <TextDesc>{genresList}</TextDesc>
        </Desc>

        {tagline ? (
          <Desc>
            <Tagline>Tag</Tagline>
            <TextDesc>{tagline}</TextDesc>
          </Desc>
        ) : null}

        <Desc>
          <Tagline>Cast</Tagline>
          <TextDesc>{castList}</TextDesc>
        </Desc>

        <Desc>
          <Tagline>Runtime</Tagline>
          <TextDesc>
            {episode_run_time || runtime} {' min'}
          </TextDesc>
        </Desc>

        <Desc>
          <Tagline>Budget</Tagline>
          <TextDesc>{formatBudget}</TextDesc>
        </Desc>

        <Title size={'30px'}>Overview</Title>
        <Text size={'18px'}> {overview} </Text>

        <Button onClick={() => onFavorite(id)}>
          <img src={isFavorite ? add : remove} alt='favorite' />
          {isFavorite ? 'Delete from Favorite' : 'Add to Favorite'}
        </Button>
      </ContainerDesc>
      <div>
        <Title size={'25px'}>Recommendations</Title>
        {similarMovie ? (
          <MoviesList
            movies={similarMovie}
            favoriteList={favoriteList}
            status={statusSimilar}
          />
        ) : null}
      </div>
    </Container>
  )
}
