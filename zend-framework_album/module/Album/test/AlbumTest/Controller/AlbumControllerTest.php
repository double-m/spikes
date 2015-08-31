<?php

namespace AlbumTest\Controller;

use Album\Model\Album;
use Zend\Test\PHPUnit\Controller\AbstractHttpControllerTestCase;

class AlbumControllerTest extends AbstractHttpControllerTestCase
{

    public function setUp()
    {
        $this->setApplicationConfig(
            include dirname(dirname(dirname(dirname(dirname(__DIR__))))) . '/config/application.config.php'
        );

        parent::setUp();
    }

    public function testShouldBeAccessibleIndexAction()
    {
        $albumTableMock = $this->getMockBuilder('Album\Model\AlbumTable')->disableOriginalConstructor()->getMock();
        $albumTableMock->expects($this->once())->method('fetchAll')->will($this->returnValue(array()));

        $serviceManager = $this->getApplicationServiceLocator();
        $serviceManager->setAllowOverride(true);
        $serviceManager->setService('Album\Model\AlbumTable', $albumTableMock);

        $this->dispatch('/');
        
        $this->assertResponseStatusCode(200);
        $this->assertModuleName('Album');
        $this->assertControllerName('Album/Controller/Album');
        $this->assertControllerClass('AlbumController');
        $this->assertMatchedRouteName('home');
    }

    public function testShouldAddAValidPostAndRedirect()
    {
        $albumTableMock = $this->getMockBuilder('Album\Model\AlbumTable')->disableOriginalConstructor()->getMock();
        $albumTableMock->expects($this->once())->method('saveAlbum')->will($this->returnValue(null));

        $serviceManager = $this->getApplicationServiceLocator();
        $serviceManager->setAllowOverride(true);
        $serviceManager->setService('Album\Model\AlbumTable', $albumTableMock);

        $postData = array('title' => 'Led Zeppelin III', 'artist' => 'Led Zeppelin', 'id' => '');
        $this->dispatch('/album/add', 'POST', $postData);
        
        $this->assertResponseStatusCode(302);
        $this->assertRedirectTo('/album');
    }

    public function testShouldEditAnAlbumAndRedirect()
    {
        $albumTableMock = $this->getMockBuilder('Album\Model\AlbumTable')->disableOriginalConstructor()->getMock();
        $albumTableMock->expects($this->once())->method('getAlbum')->will($this->returnValue(new Album()));
        $albumTableMock->expects($this->once())->method('saveAlbum')->will($this->returnValue(null));
        $this->getApplicationServiceLocator()->setAllowOverride(true)->setService('Album\Model\AlbumTable', $albumTableMock);

        $postDataEdit = array('id' => 999, 'title' => 'The Human Equation', 'artist' => 'Ayreon');
        $this->dispatch('/album/edit/1', 'POST', $postDataEdit);
        
        $this->assertResponseStatusCode(302);
        $this->assertRedirectTo('/album');
    }

    public function testShouldDeleteAnAlbumAndRedirect()
    {
        $albumTableMock = $this->getMockBuilder('Album\Model\AlbumTable')->disableOriginalConstructor()->getMock();
        $albumTableMock->expects($this->once())->method('deleteAlbum')->will($this->returnValue(null));
        $this->getApplicationServiceLocator()->setAllowOverride(true)->setService('Album\Model\AlbumTable', $albumTableMock);

        $this->dispatch('/album/delete/1', 'POST', array('del' => 'Yes'));
        
        $this->assertResponseStatusCode(302);
        $this->assertRedirectTo('/album');
    }

}