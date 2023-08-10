import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Input
        className="p-5 focus:outline-none text-black font-semibold"
        type="search"
        placeholder="Search"
      />
      <Button type="submit">Search</Button>
    </div>
  );
}
