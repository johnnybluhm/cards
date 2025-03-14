export default function JoinRoom() {
    return (
        <div>
            <h3>Join a Room</h3>
            <form>
                <label htmlFor="roomCode">Room Code:</label>
                <input type="text" id="roomCode" name="roomCode" required />
                <button type="submit">Join</button>
            </form>
        </div>
    );
}