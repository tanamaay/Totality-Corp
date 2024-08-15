export const dynamic = "force-dynamic";

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
    searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <div className="pt-20 md:pt-24 lg:pt-20">
                <EmptyState showReset />
            </div>
        );
    }

    return (
        <Container>
            <div className="pt-20 md:pt-24 lg:pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-ols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((item) => (
                    <ListingCard
                        key={item.id}
                        data={item}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
