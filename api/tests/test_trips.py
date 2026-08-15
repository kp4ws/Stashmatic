def test_create_trip(client):
    response = client.post("/v1/trips", json={
        "name": "Grand Canyon Adventure",
        "description": "A multi-day hike",
        "location": "Arizona, USA",
    })

    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Grand Canyon Adventure"
    assert data["description"] == "A multi-day hike"
    assert "id" in data


def test_get_all_trips(client):
    client.post("/v1/trips", json={"name": "Trip One"})
    client.post("/v1/trips", json={"name": "Trip Two"})

    response = client.get("/v1/trips")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    names = {trip["name"] for trip in data}
    assert names == {"Trip One", "Trip Two"}


def test_get_single_trip(client):
    create_response = client.post("/v1/trips", json={"name": "Solo Trip"})
    trip_id = create_response.json()["id"]

    response = client.get(f"/v1/trips/{trip_id}")

    assert response.status_code == 200
    assert response.json()["name"] == "Solo Trip"


def test_update_trip(client):
    create_response = client.post("/v1/trips", json={"name": "Old Name"})
    trip_id = create_response.json()["id"]

    response = client.patch(f"/v1/trips/{trip_id}", json={"name": "New Name"})

    assert response.status_code == 200
    assert response.json()["name"] == "New Name"


def test_delete_trip(client):
    create_response = client.post("/v1/trips", json={"name": "To Delete"})
    trip_id = create_response.json()["id"]

    delete_response = client.delete(f"/v1/trips/{trip_id}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/v1/trips/{trip_id}")
    assert get_response.status_code == 404


def test_get_trip_not_found(client):
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = client.get(f"/v1/trips/{fake_id}")

    assert response.status_code == 404