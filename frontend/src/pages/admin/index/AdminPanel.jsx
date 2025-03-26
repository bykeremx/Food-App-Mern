import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { FaUsers, FaCog, FaSignOutAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useFood from '../../../hooks/useFood'; // Güncellenmiş hook
import './dasboard.css';

const AdminPanel = () => {
    const { state, getFood, removeFoodAdmin, updateFoodAdmin, addFoodAdmin } = useFood();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);

    useEffect(() => {
        getFood(); // API'den yemekleri al
    }, []);

    // Modal işlemleri
    const toggleEditModal = (food) => {
        setCurrentFood(food);
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleAddButtonClick = () => {
        setIsAddModalOpen(true);
    };

    const handleAddFood = async (e) => {
        e.preventDefault();
        const newFood = {
            name: e.target.name.value,
            description: e.target.description.value,
            price: e.target.price.value,
            category: e.target.category.value,
            image: e.target.image.value,
            ingredients: e.target.ingredients.value,
            isAvailable: e.target.isAvailable.checked,
        };
        try {
            await addFoodAdmin(newFood); // Yemek ekle
            setIsAddModalOpen(false); // Başarılıysa modalı kapat
        } catch (error) {
            console.error('Yemek eklenirken hata:', error);
        }
    };

    const handleUpdateFood = async (e) => {
        e.preventDefault();
        const updatedFood = {
            name: e.target.name.value,
            description: e.target.description.value,
            price: e.target.price.value,
            category: e.target.category.value,
            image: e.target.image.value,
            ingredients: e.target.ingredients.value,
            isAvailable: e.target.isAvailable.checked,
        };
        try {
            await updateFoodAdmin(currentFood._id, updatedFood); // Yemek güncelle
            setIsEditModalOpen(false); // Başarılıysa modalı kapat
        } catch (error) {
            console.error('Yemek güncellenirken hata:', error);
        }
    };

    return (
        <div className="admin-panel">
            <Container fluid className="px-4 py-3">
                {/* Yönetim paneli üst kısmı */}
                <Row className="mb-4">
                    <Col>
                        <h2 className="mb-0">Admin Paneli</h2>
                        <p className="text-muted mb-0">Yönetim paneline hoş geldiniz!</p>
                    </Col>
                    <Col xs="auto">
                        <Button color="danger" className="d-flex align-items-center">
                            <FaSignOutAlt className="mr-2" />
                            Çıkış Yap
                        </Button>
                    </Col>
                </Row>
                <Row className="mb-4 g-4">
                    <Col lg={3} md={6}>
                        <Card className="shadow-sm border-0 bg-gradient-primary text-white">
                            <CardBody className="p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase text-white-50 mb-2">Toplam Kullanıcı</h6>
                                        <h2 className="mb-0">245</h2>
                                    </div>
                                    <div className="icon-shape bg-white-10 rounded-circle p-3">
                                        <FaUsers size={24} />
                                    </div>
                                </div>
                                <Button color="light" size="sm" className="mt-3 w-100" outline>
                                    Detaylar
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg={3} md={6}>
                        <Card className="shadow-sm border-0 bg-gradient-success text-white">
                            <CardBody className="p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase text-white-50 mb-2">Toplam Ürün</h6>
                                        <h2 className="mb-0">{state.foodList.length}</h2> {/* Food count from state */}
                                    </div>
                                    <div className="icon-shape bg-white-10 rounded-circle p-3">
                                        <FaCog size={24} />
                                    </div>
                                </div>
                                <Button color="light" size="sm" className="mt-3 w-100" outline>
                                    Yönet
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>



                {/* Yemek listeleme ve yönetim kısmı */}
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Yemek Yönetimi</h5>
                                    <Button color="primary" onClick={handleAddButtonClick}><FaPlus className="mr-2" />Yeni Yemek Ekle</Button>
                                </CardTitle>

                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Yemek Adı</th>
                                            <th>Kategori</th>
                                            <th>Fiyat</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.foodList.map((food) => (
                                            <tr key={food._id}>
                                                <td>{food.name}</td>
                                                <td>{food.category}</td>
                                                <td>{food.price}</td>
                                                <td>
                                                    <Button color="warning" onClick={() => toggleEditModal(food)}>
                                                        <FaEdit />
                                                    </Button>
                                                    <Button color="danger" onClick={() => removeFoodAdmin(food._id)}>
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Yemek ekleme modalı */}
            <Modal isOpen={isAddModalOpen} toggle={() => setIsAddModalOpen(false)}>
                <ModalHeader toggle={() => setIsAddModalOpen(false)}>Yeni Yemek Ekle</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddFood}>
                        <FormGroup>
                            <Label for="name">Yemek Adı</Label>
                            <Input type="text" id="name" name="name" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Açıklama</Label>
                            <Input type="text" id="description" name="description" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Fiyat</Label>
                            <Input type="number" id="price" name="price" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Kategori</Label>
                            <Input type="text" id="category" name="category" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Resim URL</Label>
                            <Input type="text" id="image" name="image" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ingredients">Malzemeler</Label>
                            <Input type="text" id="ingredients" name="ingredients" required />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="isAvailable" name="isAvailable" /> Müsait
                            </Label>
                        </FormGroup>
                        <ModalFooter>
                            <Button type="submit" color="primary">Ekle</Button>
                            <Button color="secondary" onClick={() => setIsAddModalOpen(false)}>İptal</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Yemek düzenleme modalı */}
            <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(false)}>
                <ModalHeader toggle={() => setIsEditModalOpen(false)}>Yemek Düzenle</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleUpdateFood}>
                        <FormGroup>
                            <Label for="name">Yemek Adı</Label>
                            <Input type="text" id="name" name="name" defaultValue={currentFood?.name} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Açıklama</Label>
                            <Input type="text" id="description" name="description" defaultValue={currentFood?.description} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Fiyat</Label>
                            <Input type="number" id="price" name="price" defaultValue={currentFood?.price} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Kategori</Label>
                            <Input type="text" id="category" name="category" defaultValue={currentFood?.category} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Resim URL</Label>
                            <Input type="text" id="image" name="image" defaultValue={currentFood?.image} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ingredients">Malzemeler</Label>
                            <Input type="text" id="ingredients" name="ingredients" defaultValue={currentFood?.ingredients} required />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="isAvailable" name="isAvailable" defaultChecked={currentFood?.isAvailable} /> Müsait
                            </Label>
                        </FormGroup>
                        <ModalFooter>
                            <Button type="submit" color="primary">Güncelle</Button>
                            <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>İptal</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AdminPanel;
