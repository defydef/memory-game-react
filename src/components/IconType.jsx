export default function IconType({ submitIconType }) {
  return (
    <select
      defaultValue=""
      className="select select-accent"
      onChange={submitIconType}
    >
      <option disabled={true} value="">
        Select icon type
      </option>
      <option value="animals-nature">Animals and Nature</option>
      <option value="food-drink">Food and Drink</option>
      <option value="smileys-emotion">Smileys</option>
    </select>
  );
}
